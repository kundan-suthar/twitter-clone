import { parseISO, formatDistanceToNow, differenceInHours, format } from 'date-fns';

const TimeAgo = ({ timestamp }) => {
    let timeAgo = ''
    if (timestamp) {
        const date = parseISO(timestamp);
        const now = new Date();
        const diffInHours = differenceInHours(now, date);

        if (diffInHours < 24) {
            timeAgo = formatDistanceToNow(date, { addSuffix: true });
        } else if (date.getFullYear() === now.getFullYear()) {
            timeAgo = format(date, 'd MMM');
        } else {
            timeAgo = format(date, 'd MMM yyyy');
        }
    }

    return (
        <span title={timestamp} className="text-zinc-500 text-sm">
            {timeAgo}
        </span>
    )
}
export default TimeAgo;