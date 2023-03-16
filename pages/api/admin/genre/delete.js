import client from "@/lib/prismadb";

export default async function userHandler(req, res) {
    const { method } = req;

    switch (method) {
        case 'POST':
            const { id } = req.body

            await client.genre.delete({
                where: { id },
            });

            client.$disconnect;
            res.status(201).json({ message: 'Delete Success' });
            break;
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}