import axios from "axios";
import { toast } from "react-toastify";
import AdminLayout from "@/layouts/admin/AdminLayout";
import Form from '@/components/Form/Create';
import { getError } from '@/utils/error';
import client from "@/lib/prismadb";

const fields = [
    {
        name: "name",
        label: "Name",
        type: "text",
    },
];

export default function EditGame({ genre }) {

    const onSubmit = async (data) => {
        try {
            await axios.put(`/api/admin/genre/edit/${genre.id}`, data);
            toast.success("Game updated successfully");
        } catch (error) {
            toast.error(getError(error));
        }
    };

    return (
        <AdminLayout>
            <Form fields={fields}
                defaultValues={genre}
                onSubmit={onSubmit} />
        </AdminLayout>
    );
}

export async function getServerSideProps(context) {
    const genreId = context.params.id;
    try {
        const genreData = await client.genre.findUnique({
            where: {
                id: genreId,
            },
        });
        return {
            props: {
                genre: { ...genreData },
            },
        };
    } catch (error) {
        return {
            notFound: true,
        };
    }
}
