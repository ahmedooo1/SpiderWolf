import { useForm } from 'react-hook-form';
import cardimg2 from '../public/spider1.png';
import Image from 'next/image';

function ContactForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        // envoyer les données vers l'API ou le backend
    };

    return (
        <div className="bg-gray-800 min-h-screen flex items-center justify-center">
            <div className="w-full max-w-lg mx-auto p-8">
                <Image src={cardimg2} alt="Service 1" className="w-full h-40 rounded-md mb-8" />
                <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-900 p-8 rounded-lg shadow-md">
                    <div className="mb-4">
                        <label className="block text-gray-300 font-bold mb-2" htmlFor="name">Nom</label>
                        <input
                            {...register('name', { required: true })}
                            className="w-full px-3 py-2 text-gray-700 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:border-gray-400"
                            id="name"
                            type="text"
                            placeholder="Nom"
                        />
                        {errors.name && <span className="text-red-500 text-sm">Ce champ est requis.</span>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-300 font-bold mb-2" htmlFor="email">Email</label>
                        <input
                            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                            className="w-full px-3 py-2 text-gray-700 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:border-gray-400"
                            id="email"
                            type="email"
                            placeholder="Email"
                        />
                        {errors.email && <span className="text-red-500 text-sm">Ce champ est requis et doit être une adresse email valide.</span>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-300 font-bold mb-2" htmlFor="message">Message</label>
                        <textarea
                            {...register('message', { required: true })}
                            className="w-full px-3 py-2 text-gray-700 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:border-gray-400 h-32"
                            id="message"
                            placeholder="Message"
                        />
                        {errors.message && <span className="text-red-500 text-sm">Ce champ est requis.</span>}
                    </div>

                    <button
                        type="submit"
                        className="bg-gray-700 text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                    >
                        Envoyer
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ContactForm;
