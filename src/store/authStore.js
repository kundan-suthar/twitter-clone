import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    login: (username, password) => {
        // Mock login logic
        // In a real app, this would be an API call
        if (username && password) {
            set({
                user: {
                    name: 'Kundan',
                    handle: '@kundanss22',
                    avatar: 'https://api.dicebear.com/9.x/micah/svg?seed=Kundan',
                    banner: 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop'
                },
                isAuthenticated: true
            });
            return true;
        }
        return false;
    },
    logout: () => set({ user: null, isAuthenticated: false }),
}));
