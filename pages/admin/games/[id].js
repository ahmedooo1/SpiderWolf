import AdminLayout from '@/layouts/admin/AdminLayout';
import client from '@/lib/prismadb';
import Image from 'next/image';
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';

export default function Game({ game, gameImages }) {
    const [date, setdate] = useState()
    const router = useRouter()

    return (
        <AdminLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-8">
                    <div className="pb-4">
                        <h1 className="text-4xl font-bold leading-tight text-gray-900">{game.title}</h1>
                        {/* <p className="text-gray-600 text-sm">{game.genre.name}</p> */}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {gameImages.map((image) => (
                            <Image
                                key={image.id}
                                src={`/uploads/${image.source}`}
                                alt={game.title}
                                width={500}
                                height={500}
                                className="object-cover h-48 w-full rounded-lg shadow-md"
                            />
                        ))}
                    </div>
                    <div className="py-4">
                        <p className="text-gray-600 text-sm">Description:</p>
                        <p className="text-gray-900">{game.description}</p>
                    </div>
                    <div className="py-4">
                        <p className="text-gray-600 text-sm">Developer:</p>
                        <p className="text-gray-900">{game.developer}</p>
                    </div>
                    <div className="py-4">
                        <p className="text-gray-600 text-sm">Editor:</p>
                        <p className="text-gray-900">{game.editor}</p>
                    </div>
                    {/* <div className="py-4">
                        <p className="text-gray-600 text-sm">Release date:</p>
                        <p className="text-gray-900">{new Date(game.releaseDate).toLocaleDateString()}</p>
                    </div> */}
                    <div className="py-4">
                        <p className="text-gray-600 text-sm">Link:</p>
                        <a href={game.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">{game.link}</a>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export async function getStaticProps({ params }) {
    const gameData = await client.game.findUnique({ where: { id: params.id } });
    const gameImageData = await client.image.findMany({ where: { gameId: gameData.id } })

    const gameImages = gameImageData.map(gameImage => ({
        ...gameImage,
        createdAt: gameImage.createdAt.toString(),
        updatedAt: gameImage.updatedAt.toString(),
    }))
    return {
        props: {
            game: {
                ...gameData,
                createdAt: gameData.createdAt.toString(),
                updatedAt: gameData.updatedAt.toString(),
            },
            gameImages,
        },
    };
}

export async function getStaticPaths() {
    const games = await client.game.findMany();
    const paths = games.map((game) => ({
        params: { id: game.id.toString() },
    }));
    return {
        paths,
        fallback: true,
    };
}
