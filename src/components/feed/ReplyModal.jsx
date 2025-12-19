import React, { useState } from 'react';
import { X, Image, Gift, List, Smile, Calendar, MapPin } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import TimeAgo from '../common/Timeago';
import Button from '../ui/Button';

const ReplyModal = ({ isOpen, onClose, tweet }) => {
    const [replyContent, setReplyContent] = useState('');
    const user = useAppStore((state) => state.user);
    const addComment = useAppStore((state) => state.addComment);
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleReply = async () => {
        if (!replyContent.trim()) return;
        setIsSubmitting(true);
        try {
            const result = await addComment(tweet.tweetId, replyContent);
            if (result.success) {
                setReplyContent('');
                onClose();
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-8 sm:pt-12 px-4 bg-[#242d34]/50 backdrop-blur-sm">
            <div className="bg-black w-full max-w-[600px] rounded-2xl flex flex-col overflow-hidden max-h-[90vh]">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-2">
                    <button
                        onClick={onClose}
                        className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors"
                    >
                        <X size={20} className="text-white" />
                    </button>
                    <button className="text-[#1d9bf0] font-bold text-[15px] hover:bg-white/10 px-3 py-1 rounded-full transition-colors">
                        Drafts
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-4 pb-4">
                    {/* Original Tweet Section */}
                    <div className="flex gap-3 relative">
                        {/* Vertical line connecting avatars */}
                        <div className="absolute left-5 top-12 bottom-0 w-0.5 bg-zinc-700 -mb-2"></div>

                        <div className="shrink-0 z-10">
                            <img
                                src={tweet.user?.avatar}
                                alt={tweet.user?.fullName}
                                className="w-10 h-10 rounded-full bg-zinc-800 object-cover"
                            />
                        </div>
                        <div className="flex-1 min-w-0 pb-4">
                            <div className="flex items-center gap-1 text-[15px]">
                                <span className="font-bold text-[#e7e9ea] truncate">{tweet.user?.fullName}</span>
                                <span className="text-zinc-500 truncate">{tweet.user?.username}</span>
                                <span className="text-zinc-500">·</span>
                                <span className="text-zinc-500"><TimeAgo timestamp={tweet.createdAt} /></span>
                            </div>
                            <div className="text-[#e7e9ea] text-[15px] whitespace-pre-wrap mt-0.5">
                                {tweet.content}
                            </div>
                            <div className="mt-4 text-zinc-500 text-[15px]">
                                Replying to <span className="text-[#1d9bf0] cursor-pointer hover:underline">{tweet.user?.username}</span>
                            </div>
                        </div>
                    </div>

                    {/* Reply Section */}
                    <div className="flex gap-3 mt-1">
                        <div className="shrink-0 z-10">
                            <img
                                src={user?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=fallback"}
                                alt="Your avatar"
                                className="w-10 h-10 rounded-full bg-zinc-800 object-cover"
                            />
                        </div>
                        <div className="flex-1 min-w-0 pt-2">
                            <textarea
                                autoFocus
                                value={replyContent}
                                onChange={(e) => setReplyContent(e.target.value)}
                                placeholder="Post your reply"
                                className="bg-transparent text-[#e7e9ea] text-xl placeholder-zinc-500 outline-none resize-none w-full min-h-[120px]"
                            />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-4 py-3 flex items-center justify-between border-t border-zinc-800">
                    <div className="flex items-center text-[#1d9bf0]">
                        <button className="p-2 rounded-full hover:bg-[#1d9bf0]/10 transition-colors">
                            <Image size={20} />
                        </button>
                        <button className="p-2 rounded-full hover:bg-[#1d9bf0]/10 transition-colors text-[#1d9bf0]/50 cursor-not-allowed">
                            <Gift size={20} />
                        </button>
                        <button className="p-2 rounded-full hover:bg-[#1d9bf0]/10 transition-colors">
                            <List size={20} />
                        </button>
                        <button className="p-2 rounded-full hover:bg-[#1d9bf0]/10 transition-colors">
                            <Smile size={20} />
                        </button>
                        <button className="p-2 rounded-full hover:bg-[#1d9bf0]/10 transition-colors">
                            <Calendar size={20} />
                        </button>
                        <button className="p-2 rounded-full hover:bg-[#1d9bf0]/10 transition-colors text-[#1d9bf0]/50 cursor-not-allowed">
                            <MapPin size={20} />
                        </button>
                    </div>
                    <Button
                        onClick={handleReply}
                        disabled={!replyContent.trim() || isSubmitting}
                        className="font-bold px-4 py-1.5 rounded-full"
                    >
                        {isSubmitting ? 'Posting...' : 'Reply'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ReplyModal;
