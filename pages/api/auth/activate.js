import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function activateHandler(req, res) {
    const { token } = req.query;

    try {
        // check if token is in database
        const existingToken = await prisma.verificationToken.findUnique({
            where: { token },
            select: { expires: true, identifier: true, token: true, },
        });

        if (!existingToken || existingToken.expires < new Date()) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // activate user account
        await prisma.user.update({
            where: {
                id: existingToken.identifier,
            },
            data: {
                isActivated: true,
            },
        });

        // delete verification token from database
        await prisma.verificationToken.delete({
            where: {
                identifier_token: {
                    identifier: existingToken.identifier,
                    token: existingToken.token,
                },
            },
        });

        res.status(200).json({ message: 'Account activated successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
