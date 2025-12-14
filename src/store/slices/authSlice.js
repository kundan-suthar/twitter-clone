import { axiosClient } from "../../api";

export const createAuthSlice = (set) => ({
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
    signup: async (userData) => {
        try {
            if (userData.username && userData.password && userData.email && userData.fullName) {
                const response = await axiosClient.post('/users/register', userData);
                console.log(response);
                if (response.status === 201 || response.status === 200) {
                    // set({
                    //     user: {
                    //         name: userData.fullName,
                    //         handle: `@${userData.username}`,
                    //         avatar: `https://api.dicebear.com/9.x/micah/svg?seed=${userData.username}`,
                    //         banner: 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop'
                    //     },
                    //     isAuthenticated: true
                    // });
                    return true;
                }
            }
        } catch (error) {
            console.error("Signup error:", error);
            // You might want to set an error state here
        }
        return false;
    },
    logout: () => set({ user: null, isAuthenticated: false }),
});
