import axios from "axios";
import { toast } from "react-toastify";
import slugify from "slugify";
import { SubmitHandler } from "react-hook-form";
import AdminLayout from "@/layouts/admin/AdminLayout";
import Form from '@/components/Form/Create';
import { getError } from '@/utils/error';
import client from "@/lib/prismadb";
import { useState } from "react";


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

export default function NewGmae({ genres }) {
    const [selectedImage, setSelectedImage] = useState();
    const [selectedFile, setSelectedFile] = useState();

    const handleFileChange = (event) => {
        if (event.target.files) {
            const file = event.target.files[0];
            setSelectedImage(URL.createObjectURL(file));
            setSelectedFile(file);
        }
    };

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('data', JSON.stringify(data));
        console.log(formData)
        axios.post(`/api/admin/games/new/`, formData)
            .then((response) => {
                toast.success('Game created successfully');
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
            />
        </AdminLayout>
    )
}


export const getServerSideProps = async (context) => {
    const data = await client.genre.findMany()

    return {
        props: {
            genres: data
        },
    };
};
