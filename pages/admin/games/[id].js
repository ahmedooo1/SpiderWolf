import AdminLayout from '@/layouts/admin/AdminLayout';
import client from '@/lib/prismadb';
import Image from 'next/image';
import { useRouter } from 'next/router'
import format from 'date-fns/format';
import { toast } from "react-toastify";
import { getError } from '@/utils/error';
import axios from 'axios';
import { useState } from 'react';
import Link from 'next/link';
import Modal from '@/components/Modal/Modal';

export default function Game({ game }) {
    const [showModal, setShowModal] = useState(false);
    const router = useRouter()


    const handleDelete = async () => {
        try {
            await axios.post(`/api/admin/games/delete/`, { id: game.id });
            toast.success('Game deleted successfully');
        } catch (error) {
            toast.error(getError(error));
        } finally {
            setShowModal(false);
            router.push("/admin/games");
        }
    };


    return (
        <AdminLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-8">
                    <div className="pb-4">
                        <h1 className="text-4xl font-bold leading-tight text-gray-900">{game.title}</h1>
                        <p className="text-gray-600 text-sm">{game.genre.name}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {game.images.map((image) => (
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
                    <div className="py-4">
                        <p className="text-gray-600 text-sm">Release date:</p>
                        <p className="text-gray-900">{format(new Date(game.releaseDate), 'dd/MM/yyyy')}</p>
                    </div>
                    <div className="py-4">
                        <p className="text-gray-600 text-sm">Link:</p>
                        <a href={game.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">{game.link}</a>
                    </div>
                </div>
                <div className="flex justify-end py-4">
                    <Link href={`edit/${game.id}`} ><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">Edit</button></Link>

                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => setShowModal(true)}
                    >
                        Delete
                    </button>

                </div>
            </div>
            {
                showModal && (
                    <Modal
                        data={game}
                        setShowModal={setShowModal}
                        showModal={showModal}
                        handleDelete={handleDelete}
                    />
                )
            }
        </AdminLayout>
    );
}

export async function getStaticProps({ params }) {
    const gameData = await client.game.findUnique({
        where: { id: params.id },
        include: {
            images: true,
            genre: true
        }
    });

    const gameImages = gameData.images.map(image => ({
        ...image,
        createdAt: image.createdAt.toISOString(),
        updatedAt: image.updatedAt.toISOString()
    }));
    
    return {
        props: {
            game: {
                ...gameData,
                createdAt: gameData.createdAt.toString(),
                updatedAt: gameData.updatedAt.toString(),
                images: gameImages,
            },
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
