import client from '@/lib/prismadb';
import formidable from 'formidable';
import path from 'path';
import fs from 'fs/promises';

export const config = {
    api: {
        bodyParser: false,
    },
};

const handler = async (req, res) => {
    try {
        await fs.mkdir(path.join(process.cwd(), '/public/uploads'), { recursive: true });
    } catch (error) {
        console.error(error);
    }

    const form = formidable({
        uploadDir: path.join(process.cwd(), '/public/uploads'),
        keepExtensions: true,
        multiples: true,
        filename: (name, ext, path, form) => {
            return Date.now().toString() + '_' + path.originalFilename;
        },
    });

    form.parse(req, async (err, fields, files) => {
        if (err) {
            res.status(400).send('Error parsing form data');
            return;
        }

        const { title, developer, editor, releaseDate, link, description, genre } = JSON.parse(fields.data);
        const selectedGenre = await client.genre.findUnique({ where: { id: genre } });
        const createdGame = await client.game.create({
            data: {
                title,
                developer,
                editor,
                releaseDate: parseInt(releaseDate),
                description,
                link,
                genre: {
                    connect: {
                        id: selectedGenre.id,
                    },
                },
            },
            include: {
                images: true,
            },
        });

        const images = files.image;
        const imagePromises = [];

        for (const image of images) {
            const source = image.newFilename

            imagePromises.push(
                client.image.create({
                    data: {
                        source,
                        gameId: createdGame.id,
                    },
                })
            );
        }
        client.$disconnect()
        await Promise.all(imagePromises);
        res.status(201).json({ createdGame });

    });
};

export default async function handlerWrapper(req, res) {
    const { method } = req;
    switch (method) {
        case 'POST':
            await handler(req, res);
            break;
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }

};

