import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import Button from '../components/ui/Button';

const RegisterPage = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const signup = useAuthStore((state) => state.signup);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const success = signup({ fullName, email, username, password });
        if (success) navigate('/home');
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
                        <h2 className="text-2xl md:text-3xl font-bold text-[#e7e9ea]">Create your account</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div className="group relative">
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    className="peer w-full bg-transparent border border-zinc-600 rounded focus:border-[#1d9bf0] focus:ring-1 focus:ring-[#1d9bf0] px-4 py-3 outline-none transition-all placeholder-zinc-500 text-lg"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="group relative">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="peer w-full bg-transparent border border-zinc-600 rounded focus:border-[#1d9bf0] focus:ring-1 focus:ring-[#1d9bf0] px-4 py-3 outline-none transition-all placeholder-zinc-500 text-lg"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="group relative">
                                <input
                                    type="text"
                                    placeholder="Username"
                                    className="peer w-full bg-transparent border border-zinc-600 rounded focus:border-[#1d9bf0] focus:ring-1 focus:ring-[#1d9bf0] px-4 py-3 outline-none transition-all placeholder-zinc-500 text-lg"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="group relative">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="peer w-full bg-transparent border border-zinc-600 rounded focus:border-[#1d9bf0] focus:ring-1 focus:ring-[#1d9bf0] px-4 py-3 outline-none transition-all placeholder-zinc-500 text-lg"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Button type="submit" fullWidth size="lg">
                                Sign up
                            </Button>
                        </div>

                        <div className="text-zinc-500 text-sm">
                            Have an account already?
                            <Link
                                to="/login"
                                className="text-[#1d9bf0] cursor-pointer hover:underline ml-1"
                            >
                                Log in
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
