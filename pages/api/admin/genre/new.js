import client from '@/lib/prismadb';

export default async function handlerGenre(req, res) {
    const { method } = req;
    switch (method) {
        case 'POST':
            const { name } = req.body
            await client.genre.create({
                data: {
                    name
                }
            })

            client.$disconnect();
            res.status(201).json({ message: 'Genre created successfully' });
            break;
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }

};

