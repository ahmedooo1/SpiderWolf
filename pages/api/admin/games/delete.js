import client from "@/lib/prismadb";
import fs from 'fs';
import path from 'path';


export default async function userHandler(req, res) {
    const { method } = req;

    switch (method) {
        case 'POST':
            const { id } = req.body

            try {
                const images = await client.image.findMany({
                    where: {
                        gameId: id
                    }
                });

                for (const image of images) {
                    await fs.promises.unlink(path.join(process.cwd(), `/public/uploads/${image.source}`))
                }
            } catch (error) {
                console.error(error);
            }

            await client.game.delete({
                where: { id },
                select: {
                    images: true
                }
            });
            
            client.$disconnect;
            res.status(201).json({ message: 'Delete Success' });
            break;
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}