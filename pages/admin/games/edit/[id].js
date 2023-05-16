import axios from "axios";
import { toast } from "react-toastify";
import AdminLayout from "@/layouts/admin/AdminLayout";
import Form from '@/components/Form/Create';
import { getError } from '@/utils/error';
import client from "@/lib/prismadb";
import { useState } from "react";
import { gameFields } from "@/utils/fields";

export default function EditGame({ game, genres }) {
    const [selectedImage, setSelectedImage] = useState(game.images);

    const handleFileChange = (event) => {
        if (event.target.files) {
            const files = Array.from(event.target.files);
            const imagesArray = files.map((file) => URL.createObjectURL(file));
            setSelectedImage((prevImages) => [...prevImages, ...imagesArray]);
        }
    };

    const onSubmit = async (data) => {
        const formData = new FormData();
        const images = selectedImage.filter((image) => typeof image !== "string");

        images.forEach((image) => {
            formData.append("image", image);
        });

        formData.append("data", JSON.stringify(data));

        try {
            await axios.put(`/api/admin/games/edit/${game.id}`, formData);
            toast.success("Game updated successfully");
        } catch (error) {
            toast.error(getError(error));
        }
    };

    return (
        <AdminLayout>
            <Form
                fields={gameFields}
                onSubmit={onSubmit}
                genres={genres}
                onSelectedFileChange={handleFileChange}
                selectedImage={selectedImage}
                defaultValues={game}
            />
        </AdminLayout>
    );
}

export async function getServerSideProps(context) {
    const gameId = context.params.id;

    try {
        const gameData = await client.game.findUnique({
            where: {
                id: gameId,
            },
            include: {
                genre: true,
                images: true,
            },
        });

        const genres = await client.genre.findMany();
        const gameImages = gameData.images.map((image) => ({
            ...image,
            createdAt: image.createdAt.toString(),
            updatedAt: image.updatedAt.toString(),
        }));

        return {
            props: {
                game: {
                    ...gameData,
                    createdAt: gameData.createdAt.toString(),
                    updatedAt: gameData.updatedAt.toString(),
                    images: gameImages,
                },
                genres,
            },
        };
    } catch (error) {
        return {
            notFound: true,
        };
    }
}
