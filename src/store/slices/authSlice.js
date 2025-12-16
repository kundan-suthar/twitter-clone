import { axiosClient } from "../../api";

export const createAuthSlice = (set) => ({
    user: null,
    access: null,
    isAuthenticated: false,
    login: async (email, password) => {
        try {
            const response = await axiosClient.post('/users/login', { email, password });
            if (response.status === 200 || response.status === 201) {
                const user = response.data.data.user;
                const token = response.data.data.accessToken;
                set({ user: user, access: token, isAuthenticated: true });
                return { success: true };
            }
        } catch (error) {
            return { success: false, error: error?.response?.data || "Server error occurred" };
        }
        return false;
    },
    signup: async (userData) => {
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
                return { success: true };
            }
        } catch (error) {

            console.error("Signup error:", error);
            // You might want to set an error state here
            return { success: false, error: error.response.data || "Server error occurred" };
        }
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
