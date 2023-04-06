import bcrypt from 'bcrypt';
import client from '@/lib/prismadb';

export default async function userHandler(req, res) {
    const { method } = req;

    switch (method) {
        case 'PUT':
            const { userId, newPassword, currentPassword } = req.body;
            console.log(req.body)

            const user = await prisma.user.findFirst({ where: { id: userId } });
            const isValidPassword = await bcrypt.compare(currentPassword, user.password);

            if (!isValidPassword) {
                res.status(401).json({ message: 'Invalid password' });
                return;
            }
            const hashedPassword = await bcrypt.hash(newPassword, 12);

            await prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    password: hashedPassword
                },
            });

            await prisma.$disconnect()
            res.status(201).json({ message: 'User created successfully' });

            break;
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
