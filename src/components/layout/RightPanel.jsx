import React from 'react';
import { Search, MoreHorizontal } from 'lucide-react';
import Button from '../ui/Button';

const TrendingItem = ({ category, title, posts }) => (
    <div className="px-4 py-3 hover:bg-white/[0.03] cursor-pointer transition-colors relative">
        <div className="flex justify-between text-xs text-zinc-500 mb-0.5">
            <span>{category}</span>
            <MoreHorizontal size={14} className="hover:text-[#1d9bf0]" />
        </div>
        <div className="font-bold text-[#e7e9ea] text-[15px]">{title}</div>
        <div className="text-xs text-zinc-500 mt-0.5">{posts} posts</div>
    </div>
);

const FollowSuggestion = ({ name, handle, avatar }) => (
    <div className="px-4 py-3 hover:bg-white/[0.03] cursor-pointer transition-colors flex items-center justify-between">
        <div className="flex items-center gap-3">
            <img src={avatar} alt={name} className="w-10 h-10 rounded-full bg-zinc-800" />
            <div className="flex flex-col">
                <span className="font-bold text-[#e7e9ea] hover:underline text-[15px]">{name}</span>
                <span className="text-zinc-500 text-sm">{handle}</span>
            </div>
        </div>
        <Button variant="secondary" size="sm" className="font-bold text-sm px-4">Follow</Button>
    </div>
)

const RightPanel = () => {
    return (
        <aside className="hidden lg:block w-[350px] pl-8 py-4 h-screen sticky top-0 overflow-y-auto no-scrollbar">
            {/* Search */}
            <div className="sticky top-0 bg-black pb-2 z-10 group">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-zinc-500 group-focus-within:text-[#1d9bf0]" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 bg-[#202327] border-transparent text-[#e7e9ea] rounded-full py-2.5 px-4 focus:bg-black focus:border-[#1d9bf0] focus:ring-1 focus:ring-[#1d9bf0] placeholder-zinc-500 outline-none transition-colors"
                        placeholder="Search"
                    />
                </div>
            </div>

            {/* Premium Promo */}
            <div className="bg-[#16181c] rounded-2xl p-4 my-4 flex flex-col gap-2">
                <h2 className="text-xl font-bold text-[#e7e9ea]">Subscribe to Premium</h2>
                <p className="text-[#e7e9ea] text-[15px] leading-5">Subscribe to unlock new features and if eligible, receive a share of ads revenue.</p>
                <div className="mt-1">
                    <Button size="sm" className="font-bold text-[15px]">Subscribe</Button>
                </div>
            </div>

            {/* What's Happening (Trending) */}
            <div className="bg-[#16181c] rounded-2xl py-3 my-4">
                <h2 className="text-xl font-bold text-[#e7e9ea] px-4 mb-2">What's happening</h2>
                <TrendingItem category="Trending in India" title="#DilipKumar" posts="24.3K" />
                <TrendingItem category="Technology · Trending" title="Gemini 2.0" posts="150K" />
                <TrendingItem category="Sports · Trending" title="Champions Trophy" posts="89.5K" />
                <TrendingItem category="Entertainment" title="Pushpa 2" posts="1.2M" />
                <div className="px-4 pt-3 text-[#1d9bf0] text-[15px] cursor-pointer hover:bg-white/[0.03]">Show more</div>
            </div>

            {/* Who to follow */}
            <div className="bg-[#16181c] rounded-2xl py-3 my-4">
                <h2 className="text-xl font-bold text-[#e7e9ea] px-4 mb-2">Who to follow</h2>
                <FollowSuggestion name="Google DeepMind" handle="@DeepMind" avatar="https://api.dicebear.com/7.x/identicon/svg?seed=DeepMind" />
                <FollowSuggestion name="React" handle="@reactjs" avatar="https://api.dicebear.com/7.x/identicon/svg?seed=React" />
                <FollowSuggestion name="Vite" handle="@vite_js" avatar="https://api.dicebear.com/7.x/identicon/svg?seed=Vite" />
                <div className="px-4 pt-3 text-[#1d9bf0] text-[15px] cursor-pointer hover:bg-white/[0.03]">Show more</div>
            </div>

            <div className="px-4 text-xs text-zinc-500 flex flex-wrap gap-x-2 gap-y-1">
                <span>Terms of Service</span>
                <span>Privacy Policy</span>
                <span>Cookie Policy</span>
                <span>Accessibility</span>
                <span>Ads info</span>
                <span>More ...</span>
                <span>© 2025 X Corp.</span>
            </div>

        </aside>
    );
};

export default RightPanel;
