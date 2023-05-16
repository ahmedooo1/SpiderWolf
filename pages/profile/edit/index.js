import client from "@/lib/prismadb";
import { getSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import { getError } from '@/utils/error';


export default function EditProfile({ user }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            firstName: user.firstName ?? "",
            lastName: user.lastName ?? "",
            email: user.email,
        },
    });

    const onSubmit = async (data) => {
        console.log(data)
        setIsSubmitting(true);
        try {
            await axios.put(`/api/user/edit/${user.id}`, data);
            toast.success("Your profile was updated successfully");
        } catch (error) {
            toast.error(getError(error));
        } finally {
            setIsSubmitting(false);
        }

    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
            <div className="my-2">
                <label htmlFor="firstName" className="block font-bold mb-1">First Name</label>
                <input type="text" id="firstName" {...register("firstName", { required: true })} className="w-full border border-gray-400 p-2 rounded-md" />
                {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName.message || "This field is required"}</span>}
            </div>
            <div className="my-2">
                <label htmlFor="lastName" className="block font-bold mb-1">Last Name</label>
                <input type="text" id="lastName" {...register("lastName", { required: true })} className="w-full border border-gray-400 p-2 rounded-md" />
                {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName.message || "This field is required"}</span>}
            </div>
            <div className="my-2">
                <label htmlFor="email" className="block font-bold mb-1">Email</label>
                <input type="email" id="email" disabled defaultValue={user.email} className="w-full border border-gray-400 p-2 rounded-md" />
            </div>
            <button type="submit" disabled={isSubmitting} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full cursor-pointer disabled:opacity-50">{isSubmitting ? "Submitting..." : "Submit"}</button>
        </form>
    );
}

export const getServerSideProps = async ({ req }) => {
    const session = await getSession({ req });

    if (!session) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }

    const user = await client.user.findUnique({
        where: {
            email: session.user.email,
        },
    });

    if (!user) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            user: {
                id: user.id,
                name: user.name,
                lastname: user.lastname,
                email: user.email,
            },
        },
    };
};