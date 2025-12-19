import { axiosClient } from "../../api";

export const createTweetSlice = (set, get) => ({
    isCreatingTweet: false,
    tweets: [],
    createTweet: async (content, image = null) => {
        set({ isCreatingTweet: true });
        try {
            let response;
            if (image) {
                const formData = new FormData();
                formData.append('content', content);
                formData.append('postImage', image);

                response = await axiosClient.post('/tweets', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            } else {
                response = await axiosClient.post('/tweets', { content });
            }

            set({ isCreatingTweet: false });

            if (response.status === 201 || response.status === 200) {
                const newTweet = response.data.data;
                set((state) => ({
                    tweets: [newTweet, ...state.tweets],
                    isCreatingTweet: false
                }));
                return { success: true, data: newTweet };
            }
        } catch (error) {
            set({ isCreatingTweet: false });
            return {
                success: false,
                error: error.response?.data?.message || "Failed to create tweet"
            };
        }
        return { success: false, error: "Unexpected error" };
    },
    getAllTweets: async () => {
        try {
            const response = await axiosClient.get('/tweets/getAllTweets');
            if (response.status === 200) {
                set({ tweets: response.data.data });
                return { success: true, data: response.data.data };
            }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || "Failed to fetch tweets"
            };
        }
        return { success: false, error: "Unexpected error" };
    },
    toggTweetLike: async (tweetId) => {
        const currentTweets = get().tweets;
        const tweetIndex = currentTweets.findIndex(t => t.tweetId === tweetId);

        if (tweetIndex === -1) return;

        const tweet = currentTweets[tweetIndex];
        const isLiked = tweet.isLiked;

        // Optimistic update
        const updatedTweets = [...currentTweets];
        updatedTweets[tweetIndex] = {
            ...tweet,
            isLiked: !isLiked,
            likesCount: tweet.isLiked
                ? tweet.likesCount - 1
                : tweet.likesCount + 1,
        };

        set({ tweets: updatedTweets });

        try {
            const response = await axiosClient.post('/likes/toggle/t', { tweetId });
            if (response.status === 200) {
                // update from server if needed, or just let the optimistic update stand
                // return { success: true, data: respone.data.data };
                return { success: true };
            }
        } catch (error) {
            // Revert on error
            console.error("Failed to toggle like, reverting...", error);
            set({ tweets: currentTweets });

            return {
                success: false,
                error: error.response?.data?.message || "Failed to toggle like"
            };
        }
        return { success: false, error: "Unexpected error" };
    },
    addComment: async (tweetId, content) => {
        try {
            const response = await axiosClient.post(`/comments/tweet/${tweetId}`, { content });
            if (response.status === 201 || response.status === 200) {
                // Update the tweets list to reflect increased comment count
                set((state) => ({
                    tweets: state.tweets.map((t) =>
                        t.tweetId === tweetId
                            ? { ...t, commentsCount: t.commentsCount + 1 }
                            : t
                    )
                }));
                return { success: true, data: response.data.data };
            }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || "Failed to add comment"
            };
        }
        return { success: false, error: "Unexpected error" };
    }
});
