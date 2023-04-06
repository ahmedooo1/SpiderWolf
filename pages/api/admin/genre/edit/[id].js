import client from '@/lib/prismadb';

export default async function handlerGenre(req, res) {
    const { method } = req;
    switch (method) {
        case 'PUT':
            const { id,name } = req.body
            await client.genre.update({
                where:{
                    id
                },
                data: {
                    name
                }
            })

            client.$disconnect();
            res.status(201).json({ message: 'Genre updated successfully' });
            break;
        default:
            res.setHeader('Allow', ['PUT']);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }

};

