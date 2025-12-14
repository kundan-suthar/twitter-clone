import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    login: (email, password) => {
        // Mock login logic
        // In a real app, this would be an API call
        if (email && password) {
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
    signup: (userData) => {
        // Mock signup logic
        if (userData.username && userData.password && userData.email && userData.fullName) {
            set({
                user: {
                    name: userData.fullName,
                    handle: `@${userData.username}`,
                    avatar: `https://api.dicebear.com/9.x/micah/svg?seed=${userData.username}`,
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
