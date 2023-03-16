import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

export default function Form({ fields, onSubmit, genres, onSelectedFileChange, selectedImage, defaultValues = {} }) {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({ defaultValues });
    const [uploading, setUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const renderInput = ({ name, label, type }) => {
        switch (type) {
            case "select":
                return (
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
                );
            case "textarea":
                return (
                    <textarea
                        {...register(name, { required: true })}
                        className="w-full border-gray-400 border-2 rounded py-2 px-3"
                    ></textarea>
                );
            case "file":
                return (
                    <>
                        <label htmlFor={name}>
                            <input type="file" id={name} hidden onChange={(e) => {
                                onSelectedFileChange(e);
                                setImagePreview(URL.createObjectURL(e.target.files[0]));
                            }} multiple />
                            <div className="w-40 rounded flex items-center justify-center border-2 ">
                                <span className="text-gray-400">
                                    <p>Upload image</p>
                                </span>
                            </div>
                        </label>
                        {selectedImage && <img src={`/uploads/${selectedImage.source}`} alt="Selected Image" className="mt-2" />}
                        {imagePreview && <img src={imagePreview} alt="Image Preview" className="mt-2" />}
                    </>
                );
            default:
                return (
                    <input
                        type={type}
                        id={name === 'releaseDate' ? "releaseDate" : ''}
                        {...(name === 'releaseDate' && { min: 1900, max: new Date().getFullYear(), step: 1 })}
                        {...register(name, { required: true })}
                        defaultValue={defaultValues[name] || ''}
                        className="w-full border-gray-400 border-2 rounded py-2 px-3"
                    />
                );
        }
    };

    const renderFields = () => {
        return fields.map(({ name, label, type }) => (
            <div key={name} className="mb-4">
                <label htmlFor={name} className="block mb-2 font-bold text-gray-700">
                    {label}
                </label>
                {renderInput({ name, label, type })}
                {errors[name] && (
                    <span className="text-red-500">{name} is required</span>
                )}
            </div>
        ));
    };

    const onSubmitHandler = async (data) => {
        setUploading(true);
        await onSubmit(data);
        setUploading(false);
    };

    return (
        <form onSubmit={handleSubmit(onSubmitHandler)} className="max-w-md mx-auto" encType="multipart/form-data">
            {renderFields()}
            <div className="flex justify-center">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    disabled={uploading}
                >
                    {uploading ? "Uploading..." : "Upload"}
                </button>
            </div>
        </form>
    );
}
