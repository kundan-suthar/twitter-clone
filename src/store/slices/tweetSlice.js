import { axiosClient } from "../../api";

export const createTweetSlice = (set) => ({
    isCreatingTweet: false,
    createTweet: async (content) => {
        set({ isCreatingTweet: true });
        try {
            const response = await axiosClient.post('/tweets', { content });
            set({ isCreatingTweet: false });
            if (response.status === 201 || response.status === 200) {
                return { success: true, data: response.data };
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
});
