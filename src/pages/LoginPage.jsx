import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import Button from '../components/ui/Button';
import { useForm } from 'react-hook-form';

const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const login = useAppStore((state) => state.login);
    const navigate = useNavigate();
    const [serverError, setServerError] = React.useState('');

    const onSubmit = async (data) => {
        const { success, error } = await login(data.email, data.password);
        if (success) {
            navigate('/home');
        } else {
            setServerError(error.message);
        }
    };

    return (
        <div className="min-h-screen bg-black text-[#eff3f4] flex flex-col md:flex-row font-sans">
            {/* Left Side - Logo/Image Area */}
            <div className="flex-1 flex items-center justify-center p-8 md:bg-zinc-900 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500 rounded-full blur-[100px]"></div>
                </div>

                <div className="z-10 flex flex-col items-center">
                    <svg viewBox="0 0 24 24" className="w-64 h-64 text-[#eff3f4] fill-current">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                    </svg>
                </div>
            </div>

            {/* Right Side - Auth Form */}
            <div className="flex-1 flex flex-col justify-center p-8 md:p-16 relative">
                <div className="max-w-[450px] w-full mx-auto space-y-12">
                    <svg viewBox="0 0 24 24" className="w-10 h-10 text-[#eff3f4] fill-current md:hidden">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                    </svg>

                    <div className="space-y-4">
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">Happening now</h1>
                        <h2 className="text-2xl md:text-3xl font-bold text-[#e7e9ea]">Join today.</h2>
                        {serverError && (
                            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded">
                                {serverError}
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-4">
                            <div className="group relative">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className={`peer w-full bg-transparent border rounded focus:ring-1 px-4 py-3 outline-none transition-all placeholder-zinc-500 text-lg ${errors.email
                                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                        : 'border-zinc-600 focus:border-[#1d9bf0] focus:ring-[#1d9bf0]'
                                        }`}
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: 'Invalid email address',
                                        },
                                    })}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                                )}
                            </div>

                            <div className="group relative">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className={`peer w-full bg-transparent border rounded focus:ring-1 px-4 py-3 outline-none transition-all placeholder-zinc-500 text-lg ${errors.password
                                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                        : 'border-zinc-600 focus:border-[#1d9bf0] focus:ring-[#1d9bf0]'
                                        }`}
                                    {...register('password', {
                                        required: 'Password is required',
                                    })}
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Button type="submit" fullWidth size="lg">
                                Log in
                            </Button>

                            <Button type="button" variant="ghost" fullWidth className="border border-zinc-600 text-[#1d9bf0]">
                                Forgot password?
                            </Button>
                        </div>

                        <div className="text-zinc-500 text-sm">
                            Don't have an account?
                            <Link
                                to="/register"
                                className="text-[#1d9bf0] cursor-pointer hover:underline ml-1"
                            >
                                Sign up
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
