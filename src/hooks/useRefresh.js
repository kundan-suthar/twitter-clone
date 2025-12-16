import { axiosClient } from "../api";


export const useRefresh = () => {
    const refresh = async () => {
        try {
            const response = await axiosClient.get("/users/refresh-token", {
                withCredentials: true
            });
            return response.data.data.accessToken;
        } catch (error) {
            console.error("Refresh error:", error);
            return null;
        }
    };
    return refresh;
};