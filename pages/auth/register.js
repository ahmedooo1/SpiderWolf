import { useForm } from "react-hook-form";
import axios from 'axios';
import { getSession } from "next-auth/react";


export async function getServerSideProps({ req }) {
    const session = await getSession({ req });

    if (session) {
        return {
            redirect: { destination: '/', permanent: false },
        };
    }

    return { props: {} };
}

export default function register() {
    const { register, watch, handleSubmit, formState: { errors } } = useForm();

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

    const onSubmit = (data) => {
        if (data.password === data.confirmPassword) {
            axios.post('/api/auth/register', data)
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    if (error.response && error.response.status === 422) {
                        const message = error.response.data.message;
                        alert(message);
                    } else {
                        console.error(error);
                    }
                });
        }
    };

    return (
        <div className=" py-8 sm:py-12 lg:py-16">
            <div className="max-w-md mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="text-center">
                    <h2 className="text-lg font-medium text-gray-400 uppercase tracking-wide">Register</h2>
                </div>
                <div className="mt-8">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor="pseudo" className="block text-sm font-medium text-gray-400">Pseudo</label>
                            <div className="mt-1">
                                <input id="pseudo" name="pseudo" type="text" className="appearance-none bg-gray-800 border-gray-700 rounded-md py-2 px-3 text-base text-gray-100 w-full"
                                    {...register("pseudo", { required: true })}
                                    aria-invalid={errors.pseudo ? "true" : "false"} />
                                {errors.pseudo?.type === 'required' && <p role="alert">Pseudo is required</p>}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-400">Email</label>
                            <div className="mt-1">
                                <input id="email" name="email" type="email" className="appearance-none bg-gray-800 border-gray-700 rounded-md py-2 px-3 text-base text-gray-100 w-full"
                                    {...register("email", {
                                        required: "Email Address is required", pattern: {
                                            value: emailRegex,
                                            message: "Invalid email address format"
                                        }
                                    })} aria-invalid={errors.email ? "true" : "false"} />
                                {errors.email && <p role="alert">{errors.email?.message}</p>}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-400">Password</label>
                            <div className="mt-1">
                                <input id="password" name="password" type="password" className="appearance-none bg-gray-800 border-gray-700 rounded-md py-2 px-3 text-base text-gray-100 w-full"
                                    {...register("password", { required: true, minLength: 8 })}
                                    aria-invalid={errors.password ? "true" : "false"} />
                                {errors.password?.type === 'required' && <p role="alert">Password is required</p>}
                                {errors.password?.type === 'minLength' && <p role="alert">Password must have at least 8 characters</p>}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-400">Confirm Password</label>
                            <div className="mt-1">
                                <input id="confirm-password" name="confirm-password" type="password" className="appearance-none bg-gray-800 border-gray-700 rounded-md py-2 px-3 text-base text-gray-100 w-full"
                                    {...register("confirmPassword", { required: true, validate: (value) => value === watch("password") })}
                                    aria-invalid={errors.confirmPassword ? "true" : "false"} />
                                {errors.confirmPassword?.type === 'required' && <p role="alert">Confirm Password is required</p>}
                                {errors.confirmPassword?.type === 'validate' && <p role="alert">Passwords do not match</p>}
                            </div>
                        </div>
                        <div>
                            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-200 bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <svg className="h-5 w-5 text-gray-500 group-hover:text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M3.293 6.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 3.414V16a1 1 0 01-1.707.707L7 14.414l-2.293 2.293A1 1 0 013 15V6.414l.293.293z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
