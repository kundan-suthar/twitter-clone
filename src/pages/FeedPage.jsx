import ErrorBoundary from '../components/common/ErrorBoundary';
import Feed from '../components/feed/Feed';

const FeedPage = () => {
    return (
        <ErrorBoundary>
            <Feed />
        </ErrorBoundary>
    );
};

export default FeedPage;
