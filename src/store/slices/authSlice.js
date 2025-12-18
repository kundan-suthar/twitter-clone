import { axiosClient } from "../../api";

export const createAuthSlice = (set) => ({
    user: null,
    access: null,
    isAuthenticated: false,
    isCheckingAuth: true,
    isLoggingIn: false,
    isSigningUp: false,
    checkAuth: async () => {
        try {
            const response = await axiosClient.get("/users/current-user");
            if (response.status === 200) {
                set({ user: response.data.data, isAuthenticated: true, isCheckingAuth: false });
            } else {
                set({ isCheckingAuth: false, isAuthenticated: false });
            }
        } catch (error) {
            set({ isCheckingAuth: false, isAuthenticated: false });
        }
    },
    login: async (email, password) => {
        set({ isLoggingIn: true });
        try {
            const response = await axiosClient.post('/users/login', { email, password });
            if (response.status === 200 || response.status === 201) {
                const user = response.data.data.user;
                const token = response.data.data.accessToken;
                set({ user: user, access: token, isAuthenticated: true, isLoggingIn: false });
                return { success: true };
            }
        } catch (error) {
            set({ isLoggingIn: false });
            return { success: false, error: error?.response?.data || "Server error occurred" };
        }
        set({ isLoggingIn: false });
        return false;
    },
    signup: async (userData) => {
        set({ isSigningUp: true });
        try {
            const formData = new FormData();
            formData.append('fullName', userData.fullName);
            formData.append('email', userData.email);
            formData.append('username', userData.username);
            formData.append('password', userData.password);

            // Check if avatar exists and append the first file
            if (userData.avatar && userData.avatar[0]) {
                formData.append('avatar', userData.avatar[0]);
            }

            const response = await axiosClient.post('/users/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response);
            if (response.status === 201 || response.status === 200) {
                set({ isSigningUp: false });
                return { success: true };
            }
        } catch (error) {
            set({ isSigningUp: false });
            console.error("Signup error:", error);
            // You might want to set an error state here
            return { success: false, error: error.response.data || "Server error occurred" };
        }
        set({ isSigningUp: false });
        return false;
    },
    logout: async () => {
        try {
            await axiosClient.post('/users/logout');
        } catch (error) {
            console.error("Logout error:", error);
        }
        set({ user: null, access: null, isAuthenticated: false });
    },
});
