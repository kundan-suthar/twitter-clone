import React, { useState, useEffect } from 'react';
import Tweet from './Tweet';
import Button from '../ui/Button';
import { useAppStore } from '../../store/useAppStore';
import { Image, Gift, List, Smile, Calendar, MapPin, Globe } from 'lucide-react';

const icons = [Image, Gift, List, Smile, Calendar, MapPin];

const Feed = () => {
    const [activeTab, setActiveTab] = useState('For you');
    const user = useAppStore((state) => state.user);
    const [tweetContent, setTweetContent] = useState('');

    // Mock Tweets
    const tweets = [
        {
            id: 1,
            user: {
                name: 'MEXC',
                handle: '@MEXC_Official',
                avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=MEXC'
            },
            content: "MEXC Golden Era Showdown is LIVE! 🔥\n\nFrom Nov 27 - Dec 17, join the Golden Era Showdown and complete for exclusive rewards. Step into the arena and unlock a wave of surprises.\n\nWhy can't you be the next Gold Catcher?",
            image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=2069&auto=format&fit=crop",
            stats: { replies: 141, retweets: 84, likes: 2100, views: '232K' },
            timestamp: 'Ad'
        },
        {
            id: 2,
            user: {
                name: 'React',
                handle: '@reactjs',
                avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=React'
            },
            content: "React 19 is now available! \n\nWe're excited to share the latest version of React with support for Server Actions, the new use() hook, and better custom element support.",
            image: null,
            stats: { replies: 452, retweets: 1205, likes: 8500, views: '1.2M' },
            timestamp: '2h'
        },
        {
            id: 3,
            user: {
                name: 'Elon Musk',
                handle: '@elonmusk',
                avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=Elon'
            },
            content: "Make humanity multiplanetary.",
            image: null,
            stats: { replies: '15K', retweets: '24K', likes: '185K', views: '20M' },
            timestamp: '5h'
        }
    ];

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <div className="sticky top-0 bg-black/80 backdrop-blur-md z-10 border-b border-zinc-800">
                <h2 className="px-4 py-3 text-xl font-bold md:hidden">Home</h2>
                <div className="flex w-full">
                    {['For you', 'Following'].map((tab) => (
                        <div
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className="flex-1 hover:bg-zinc-900 transition-colors cursor-pointer flex justify-center h-[53px] relative"
                        >
                            <div className="flex flex-col justify-center h-full relative px-2">
                                <span className={`font-medium ${activeTab === tab ? 'text-[#e7e9ea] font-bold' : 'text-zinc-500'}`}>
                                    {tab}
                                </span>
                                {activeTab === tab && (
                                    <div className="absolute bottom-0 left-0 w-full h-[4px] bg-[#1d9bf0] rounded-full"></div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Compose Tweet Box */}
            <div className="hidden md:flex px-4 py-3 border-b border-zinc-800 gap-3">
                <img
                    src={user?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=fallback"}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full bg-zinc-800 object-cover"
                />
                <div className="flex-1 flex flex-col pt-2 bg-transparent">
                    <textarea
                        placeholder="What is happening?!"
                        className="bg-transparent text-xl text-[#e7e9ea] placeholder-zinc-500 outline-none resize-none min-h-[60px]"
                        rows={2}
                        value={tweetContent}
                        onChange={(e) => setTweetContent(e.target.value)}
                    />

                    <div className="flex items-center text-[#1d9bf0] font-bold text-sm border-b border-zinc-800 pb-3 mb-3 cursor-pointer">
                        <Globe size={16} className="mr-1" />
                        <span>Everyone can reply</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-0.5 text-[#1d9bf0]">
                            {icons.map((Icon, idx) => (
                                <div key={idx} className="p-2 rounded-full hover:bg-[#1d9bf0]/10 cursor-pointer transition-colors">
                                    <Icon size={20} />
                                </div>
                            ))}
                        </div>
                        <Button
                            size="md"
                            className="font-bold rounded-full px-5 py-2"
                            disabled={!tweetContent.trim()}
                        >
                            Post
                        </Button>
                    </div>
                </div>
            </div>

            {/* Show nice pinned toast if new posts (visual candy from screenshot) */}
            <div className="text-center py-3 border-b border-zinc-800 text-[#1d9bf0] text-[15px] cursor-pointer hover:bg-zinc-900 transition-colors">
                Show 105 posts
            </div>

            {/* Tweets Feed */}
            <div>
                {tweets.map(tweet => (
                    <Tweet key={tweet.id} {...tweet} />
                ))}
            </div>
        </div>
    );
};

export default Feed;
