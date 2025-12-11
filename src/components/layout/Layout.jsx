import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import RightPanel from './RightPanel';

const Layout = () => {
    return (
        <div className="min-h-screen bg-black text-[#e7e9ea] font-sans">
            <div className="container mx-auto xl:max-w-[1265px] flex">
                <Sidebar />
                <main className="flex-1 min-w-0 border-r border-zinc-800">
                    <Outlet />
                </main>
                <RightPanel />
            </div>
        </div>
    );
};

export default Layout;
