import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    Home,
    Search,
    Bell,
    Mail,
    SquareTerminal,
    Users,
    User,
    MoreHorizontal,
    PenTool
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import Button from '../ui/Button';

const Sidebar = () => {
    const user = useAppStore((state) => state.user);
    const logout = useAppStore((state) => state.logout);
    const [showLogoutMenu, setShowLogoutMenu] = useState(false);


    const navItems = [
        { icon: Home, label: 'Home', path: '/home' },
        { icon: Search, label: 'Explore', path: '/explore' },
        { icon: Bell, label: 'Notifications', path: '/notifications' },
        { icon: Mail, label: 'Messages', path: '/messages' },
        { icon: SquareTerminal, label: 'Grok', path: '/grok' },
        { icon: Users, label: 'Communities', path: '/communities' },
        { icon: User, label: 'Profile', path: `/profile/${user?.handle}` },
        { icon: MoreHorizontal, label: 'More', path: '/more' },
    ];

    return (
        <aside className="hidden flex-col   max-h-[100dvh] sticky top-0 px-2 lg:w-[275px] md:flex md:w-[88px] border-r border-zinc-800">
            {/* Logo */}
            <div className="pt-3 px-3 w-min hover:bg-zinc-900 rounded-full cursor-pointer transition-colors">
                <svg viewBox="0 0 24 24" className="w-[30px] h-[30px] text-[#eff3f4] fill-current">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                </svg>
            </div>

            {/* Nav */}
            <nav className="flex-1 flex flex-col gap-1 mt-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.label}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-4 px-4 py-3 rounded-full text-xl transition-colors hover:bg-zinc-900 w-max xl:w-full ${isActive ? 'font-bold' : 'font-normal text-[#e7e9ea]'
                            }`
                        }
                    >
                        <item.icon size={26} strokeWidth={2} />
                        <span className="hidden xl:inline">{item.label}</span>
                    </NavLink>
                ))}

                <div className="mt-4 px-2 xl:w-full w-min">
                    <Button size="lg" className="hidden xl:block w-full py-3.5 text-lg">Post</Button>
                    <div className="xl:hidden w-[50px] h-[50px] rounded-full bg-[#1d9bf0] flex items-center justify-center hover:bg-[#1a8cd8] text-white shadow-sm cursor-pointer">
                        <PenTool size={24} />
                    </div>
                </div>
            </nav>

            {/* User Profile */}
            <div className="relative my-4">
                {showLogoutMenu && (
                    <div className="absolute bottom-full left-0 w-[260px] bg-black border border-zinc-800 rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.1)] py-2 mb-2 overflow-hidden z-50">
                        <div
                            onClick={logout}
                            className="px-4 py-3 hover:bg-zinc-900 cursor-pointer font-bold text-[#e7e9ea] text-[15px] transition-colors"
                        >
                            Log out @{user?.username}
                        </div>
                    </div>
                )}

                <div
                    onClick={() => setShowLogoutMenu(!showLogoutMenu)}
                    className="p-3 rounded-full hover:bg-zinc-900 transition-colors cursor-pointer flex items-center justify-between xl:w-full w-min"
                >
                    <div className="flex items-center gap-3">
                        <img
                            src={user?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=fallback"}
                            alt="Avatar"
                            className="w-10 h-10 rounded-full bg-zinc-800"
                        />
                        <div className="hidden xl:block">
                            <div className="font-bold text-[#e7e9ea] text-sm leading-4">{user?.username}</div>
                            <div className="text-zinc-500 text-sm leading-4">{user?.email}</div>
                        </div>
                    </div>
                    <MoreHorizontal size={18} className="text-[#e7e9ea] hidden xl:block" />
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
