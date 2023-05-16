import bcrypt from 'bcrypt';
import client from '@/lib/prismadb';

export default async function userHandler(req, res) {
    const { method } = req;

    switch (method) {
        case 'PUT':
            const { firstName, lastName, email } = req.body;


            await client.user.update({
                where: {
                    email
                },
                data: {
                    name: firstName,
                    lastname: lastName,
                },
            });

            prisma.$disconnect()
            res.status(201).json({ message: 'User created successfully' });

            break;
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
