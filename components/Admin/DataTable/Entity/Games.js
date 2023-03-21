import Modal from '@/components/Modal/Modal'
import { Switch } from '@headlessui/react'
import Link from 'next/link'
import { useState } from 'react';
import { toast } from "react-toastify";
import { getError } from '@/utils/error';
import axios from 'axios';

export default function GamesEntity({ games }) {
    const [showModal, setShowModal] = useState(false);

    const handleDelete = async (id) => {
        try {
            await axios.post(`/api/admin/games/delete/`, { id });
            toast.success('Game deleted successfully');
        } catch (error) {
            toast.error(getError(error));
        } finally {
            setShowModal(false);
        }
    };
    return (
        <>
            {games.map((game) => (
                <tr key={game.id}>
                    <td className="py-3 px-4 whitespace-nowrap">
                        <div className="flex items-center h-5">
                            <input
                                id={`checkbox-${game.id}`}
                                type="checkbox"
                                className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                            />
                            <label htmlFor={`checkbox-${game.id}`} className="sr-only">
                                Checkbox
                            </label>
                        </div>
                    </td>
                    <td className="py-3 px-6 whitespace-nowrap text-black text-center">{(game.id).slice(0, 5) + '...'}</td>
                    <td className="py-3 px-6 whitespace-nowrap text-black text-center">{game.title}</td>
                    <td className="py-3 px-6 whitespace-nowrap text-black text-center">{game.developer}</td>
                    <td className="py-3 px-6 whitespace-nowrap text-black text-center">{game.editor}</td>
                    <td className="py-3 px-6 whitespace-nowrap text-black text-center">{game.releaseDate}</td>

                    <td className="py-3 px-6 whitespace-nowrap text-right text-sm font-medium">
                        <Link href={`games/${game.id}`} className="text-green-500 hover:text-green-700 text-center">
                            Voir info
                        </Link>
                    </td>
                    <td className="py-3 px-6 whitespace-nowrap text-right text-sm font-medium">
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-center"
                            onClick={() => setShowModal(true)}
                        >
                            Delete
                        </button>
                    </td>
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
                </tr>
            ))}
        </>
    )
}
