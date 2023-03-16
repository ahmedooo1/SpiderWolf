import axios from "axios";
import { toast } from "react-toastify";
import slugify from "slugify";
import { SubmitHandler } from "react-hook-form";
import AdminLayout from "@/layouts/admin/AdminLayout";
import Form from '@/components/Form/Create';
import { getError } from '@/utils/error';
import client from "@/lib/prismadb";
import { useState, useEffect } from "react";

const fields = [
    {
        name: "title",
        label: "Title",
        type: "text",
    },
    {
        name: "developer",
        label: "Developer",
        type: "text",
    },
    {
        name: "editor",
        label: "Editor",
        type: "text",
    },
    {
        name: "releaseDate",
        label: "ReleaseDate",
        type: "number",
    },
    {
        name: "link",
        label: "Link",
        type: "url",
    },
    {
        name: "description",
        label: "Description",
        type: "textarea",
    },
    {
        name: "genre",
        label: "Genre",
        type: "select",
    },
    {
        name: "images",
        label: "Image",
        type: "file",
    },
];

export default function EditGame({ game, genres }) {
    const [selectedImage, setSelectedImage] = useState([]);
    const [selectedFile, setSelectedFile] = useState([]);

    useEffect(() => {
        setSelectedImage(game.images);
    }, [game]);

    const handleFileChange = (event) => {
        if (event.target.files) {
            const files = event.target.files;
            const imagesArray = [];

            for (let i = 0; i < files.length; i++) {
                imagesArray.push(URL.createObjectURL(files[i]));
            }

            setSelectedFile(files);
            setSelectedImage(imagesArray);
        }
    };

    const onSubmit = async (data) => {
        const formData = new FormData();
        const images = selectedFile.length > 0 ? selectedFile : selectedImage.map((image) => image.url);

        for (let i = 0; i < images.length; i++) {
            formData.append("image", images[i]);
        }
        formData.append("data", JSON.stringify(data));

        axios.put(`/api/admin/games/${game.id}`, formData)
            .then(() => {
                toast.success('Game updated successfully');
            })
            .catch((error) => {
                toast.error(getError(error));
            });

    };


    return (
        <AdminLayout>
            <Form fields={fields}
                onSubmit={onSubmit}
                genres={genres}
                onSelectedFileChange={handleFileChange}
                selectedImage={selectedImage}
                defaultValues={game}
            />
        </AdminLayout>
    )

}

export const getServerSideProps = async (context) => {
    const gameId = context.params.id;
    const gameData = await client.game.findUnique({
        where: {
            id: parseInt(gameId),
        },
        include: {
            genre: true,
            images: true,
        },
    });
    const genres = await client.genre.findMany();

    return {
        props: {
            game: gameData,
            genres: genres,
        },
    };

};