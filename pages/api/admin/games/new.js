// import client from '@/lib/prismadb';
// import formidable from 'formidable';
// import path from 'path';
// import fs from 'fs/promises';

// export const config = {
//     api: {
//         bodyParser: false,
//     },
// };

// const handler = async (req, res) => {
//     try {
//         await fs.readdir(path.join(process.cwd() + '/public', '/uploads'));
//     } catch (error) {
//         await fs.mkdir(path.join(process.cwd() + '/public', '/uploads'));
//     }

//     const options = {
//         uploadDir: path.join(process.cwd(), '/public/uploads'),
//         filename: (name, ext, path, form) => {
//             return Date.now().toString() + '_' + path.originalFilename;
//         },
//     };

//     const form = formidable(options);

//     form.parse(req, async (err, fields, files) => {
//         if (err) {
//             res.status(400).send('Error parsing form data');
//             return;
//         }

//         const { title, developer, editor, releaseDate, link, description, genre } = JSON.parse(fields.data);
//         const selectedGenre = await client.genre.findUnique({ where: { id: genre } });

//         const createdGame = await client.game.create({
//             data: {
//                 title,
//                 developer,
//                 editor,
//                 releaseDate: parseInt(releaseDate),
//                 description,
//                 link,
//                 genre: {
//                     connect: {
//                         id: selectedGenre.id,
//                     },
//                 },
//             },
//         });
//         console.log(createdGame)
//         const gameTitle = createdGame.title;
//         const gameDir = path.join(process.cwd() + '/public/uploads', Date.now().toString() + '_' + gameTitle);

//         try {
//             await fs.access(gameDir);
//         } catch (error) {
//             await fs.mkdir(gameDir);
//         }

//         const image = files.image;
//         const imagePromises = [];
//         console.log(image);
//         for (let i = 0; i < image.length; i++) {
//             const source = files.image[0].newFilename;

//             imagePromises.push(client.image.create({
//                 data: {
//                     source,
//                     game: {
//                         connect: {
//                             id: createdGame.id,
//                         },
//                     },
//                 },
//             }));
//         }

//         await Promise.all(imagePromises);

//         res.json({ game: createdGame });
//     });
// };

// export default handler;



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
        await fs.readdir(path.join(process.cwd() + '/public', '/uploads'));
    } catch (error) {
        await fs.mkdir(path.join(process.cwd() + '/public', '/uploads'));
    }

    const options = {
        uploadDir: path.join(process.cwd(), '/public/uploads'),
        filename: (name, ext, path, form) => {
            return Date.now().toString() + '_' + path.originalFilename;
        },
    };

    const form = formidable(options);

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
        });

        const gameTitle = createdGame.title;
        const gameDir = path.join(process.cwd() + '/public/uploads', Date.now().toString() + '_' + gameTitle);

        try {
            await fs.access(gameDir);
        } catch (error) {
            await fs.mkdir(gameDir);
        }

        const images = files.image;
        const imagePromises = [];

        for (let i = 0; i < images.length; i++) {
            const image = images[i];
            const source = image.newFilename;

            console.log(source)
            // imagePromises.push(client.image.create({
            //     data: {
            //         source: `/uploads/${gameTitle}/${image.name}`,
            //         game: {
            //             connect: {
            //                 id: createdGame.id,
            //             },
            //         },
            //     },
            // }));
        }

        await Promise.all(imagePromises);

        res.json({ game: createdGame });
    });
};

export default handler;
