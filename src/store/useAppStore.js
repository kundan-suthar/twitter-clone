import { create } from 'zustand';
import { createAuthSlice } from './slices/authSlice';
import { createTweetSlice } from './slices/tweetSlice';

export const useAppStore = create((...a) => ({
    ...createAuthSlice(...a),
    ...createTweetSlice(...a),
}));
