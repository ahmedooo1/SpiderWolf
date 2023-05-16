import client from "@/lib/prismadb";
import { getSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { getError } from '@/utils/error';


export default function EditProfile({ user }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    console.log(user)
    const onSubmit = async (data) => {
        const userId = user.id
        setIsSubmitting(true);
        try {
            await axios.put(`/api/user/edit/password`, {...data, userId});
            toast.success("Your profile was updated successfully");
        } catch (error) {
            toast.error(getError(error));
        } finally {
            setIsSubmitting(false);
        }

    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
            <div>

                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-400">
                    Current Password
                </label>
                <div className="mt-1">
                    <input
                        id="currentPassword"
                        name="currentPassword"
                        type="password"
                        className="w-full border border-gray-400 p-2 rounded-md"
                        {...register("currentPassword", { required: true, minLength: 8 })}
                        aria-invalid={errors.currentPassword ? "true" : "false"}
                    />
                    {errors.currentPassword?.type === "required" && (
                        <p role="alert">Current Password is required</p>
                    )}
                    {errors.currentPassword?.type === "minLength" && (
                        <p role="alert">Current Password must have at least 8 characters</p>
                    )}
                </div>
            </div>

            <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-400">
                    New Password
                </label>
                <div className="mt-1">
                    <input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        className="w-full border border-gray-400 p-2 rounded-md"
                        {...register("newPassword", { required: true, minLength: 8 })}
                        aria-invalid={errors.newPassword ? "true" : "false"}
                    />
                    {errors.newPassword?.type === "required" && (
                        <p role="alert">New Password is required</p>
                    )}
                    {errors.newPassword?.type === "minLength" && (
                        <p role="alert">New Password must have at least 8 characters</p>
                    )}
                </div>
            </div>

            <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-400">
                    Confirm New Password
                </label>
                <div className="mt-1">
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        className="w-full border border-gray-400 p-2 rounded-md"
                        {...register("confirmPassword", {
                            required: true,
                            validate: (value) => value === watch("newPassword"),
                        })}
                        aria-invalid={errors.confirmPassword ? "true" : "false"}
                    />
                    {errors.confirmPassword?.type === "required" && (
                        <p role="alert">Confirm New Password is required</p>
                    )}
                    {errors.confirmPassword?.type === "validate" && (
                        <p role="alert">New Passwords do not match</p>
                    )}
                </div>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full cursor-pointer disabled:opacity-50"
            >
                {isSubmitting ? "Submitting..." : "Submit"}
            </button>

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