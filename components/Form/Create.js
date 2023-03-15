import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

export default function Form({ fields, onSubmit, genres, onSelectedFileChange, selectedImage }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [uploading, setUploading] = useState();


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto" encType="multipart/form-data">
            {fields.map(({ name, label, type }) => (

                <div key={name} className="mb-4">
                    <label htmlFor={name} className="block mb-2 font-bold text-gray-700">
                        {label}
                    </label>
                    {
                        type !== 'select' && type !== 'textarea' && type !== 'file' ? (
                            <input
                                type={type}
                                id={name === 'releaseDate' ? "releaseDate" : ''}
                                {...(name === 'releaseDate' && { min: 1900, max: new Date().getFullYear(), step: 1, defaultValue: new Date().getFullYear() })}
                                {...register(name, { required: true })}
                                className="w-full border-gray-400 border-2 rounded py-2 px-3"
                            />
                        ) : type === 'textarea' ? (
                            <textarea
                                {...register(name, { required: true })}
                                className="w-full border-gray-400 border-2 rounded py-2 px-3"
                            ></textarea>
                        ) : type === 'file' ? (
                            <>
                                <label htmlFor={name}>
                                    <input type="file" id={name} hidden onChange={onSelectedFileChange} multiple />
                                    <div className="w-40 rounded flex items-center
                                    justify-center border-2 ">

                                        <span className="text-gray-400">
                                            <p>Upload image</p>
                                        </span>

                                    </div>
                                </label>
                            </>
                        ) : (
                            <select
                                {...register(name, { required: true })}
                                className="w-full border-gray-400 border-2 rounded py-2 px-3"
                            >
                                {genres.map((genre) => (
                                    <option key={genre.id} value={genre.id}>
                                        {genre.name}
                                    </option>
                                ))}
                            </select>
                        )
                    }

                    {errors.name && (
                        <span className="text-red-500">{name} is required</span>
                    )}
                </div>
            ))
            }
            <div className="flex justify-center">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    {uploading ? "Uploading..." : "Upload"}
                </button>
            </div>
        </form >
    );
}