import { useState } from "react";
import Modal from "@/components/Modal/Modal";
import axios from "axios";
import { toast } from "react-toastify";
import { getError } from '@/utils/error';


export default function GenresEntity({ genres }) {
    const [showModal, setShowModal] = useState(false);

    const handleDelete = async (id) => {
        try {
            await axios.post(`/api/admin/genre/delete/`, { id });
            toast.success('Game deleted successfully');
        } catch (error) {
            toast.error(getError(error));
        } finally {
            setShowModal(false);
        }
    };
    return (
        <>
            {genres.map((genre) => (
                <tr key={genre.id}>
                    <td className="py-3 px-4 whitespace-nowrap">
                        <div className="flex items-center h-5">
                            <input
                                id={`checkbox-${genre.id}`}
                                type="checkbox"
                                className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                            />
                            <label htmlFor={`checkbox-${genre.id}`} className="sr-only">
                                Checkbox
                            </label>
                        </div>
                    </td>
                    <td className="py-3 px-6 whitespace-nowrap text-black">{(genre.id).slice(0, 5) + '...'}</td>
                    <td className="py-3 px-6 whitespace-nowrap text-black">{genre.name}</td>
                    <td className="py-3 px-6 whitespace-nowrap text-right text-sm font-medium">
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => setShowModal(true)}
                        >
                            Delete
                        </button>
                    </td>
                    
                    {
                        showModal && (
                            <Modal
                                data={genre}
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
