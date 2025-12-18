import { MessageCircle, Repeat2, Heart, BarChart2, Share, MoreHorizontal } from 'lucide-react';
import TimeAgo from '../common/Timeago';

const Tweet = ({
    user = {},
    content = "",
    image = null,
    stats = { replies: 0, retweets: 0, likes: 0, views: 0 },
    createdAt
}) => {
    const { fullName, username, avatar } = user;

    const ActionButton = ({ icon: Icon, count, colorClass = "hover:text-[#1d9bf0]", bgClass = "group-hover:bg-[#1d9bf0]/10" }) => (
        <button className={`group flex items-center gap-1.5 text-zinc-500 transition-colors text-[13px] ${colorClass}`}>
            <div className={`p-2 rounded-full transition-colors ${bgClass}`}>
                <Icon size={18} />
            </div>
            <span>{count}</span>
        </button>
    );

    return (
        <article className="px-4 py-3 border-b border-zinc-800 hover:bg-white/[0.03] transition-colors cursor-pointer flex gap-3">
            {/* Avatar */}
            <div className="shrink-0">
                <img src={avatar} alt={fullName} className="w-10 h-10 rounded-full bg-zinc-800 object-cover" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 truncate text-[15px]">
                        <span className="font-bold text-[#e7e9ea] truncate">{fullName}</span>
                        <span className="text-zinc-500 truncate">{username}</span>
                        <span className="text-zinc-500">·</span>
                        <span className="text-zinc-500 hover:underline">{<TimeAgo timestamp={createdAt} />}</span>
                    </div>
                    <button className="text-zinc-500 hover:text-[#1d9bf0] p-1 rounded-full hover:bg-[#1d9bf0]/10 transition-colors">
                        <MoreHorizontal size={18} />
                    </button>
                </div>

                {/* Body */}
                <div className="text-[#e7e9ea] text-[15px] whitespace-pre-wrap leading-5 mt-0.5">
                    {content}
                </div>

                {/* Image attachment */}
                {image && (
                    <div className="mt-3 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/50">
                        <img src={image} alt="Tweet attachment" className="w-full h-auto max-h-[500px] object-cover" />
                    </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between mt-3 max-w-[425px]">
                    <ActionButton icon={MessageCircle} count={stats.replies} />
                    <ActionButton icon={Repeat2} count={stats.retweets} colorClass="hover:text-green-500" bgClass="group-hover:bg-green-500/10" />
                    <ActionButton icon={Heart} count={stats.likes} colorClass="hover:text-pink-500" bgClass="group-hover:bg-pink-500/10" />
                    <ActionButton icon={BarChart2} count={stats.views} />
                    <div className="flex items-center">
                        <ActionButton icon={Share} count="" />
                    </div>
                </div>
            </div>
        </article>
    );
};

export default Tweet;
