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
        name: "name",
        label: "Name",
        type: "text",
    },
];

export default function NewGmae() {

    const onSubmit = async (data) => {

        axios.post(`/api/admin/genre/new/`, data)
            .then(() => {
                toast.success('Genre created successfully');
            })
            .catch((error) => {
                toast.error(getError(error));
            });

    };


    return (
        <AdminLayout>
            <Form fields={fields}
                onSubmit={onSubmit}
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
