import axios from "axios";


export const useRefresh = () => {
    const refresh = async () => {
        try {
            const response = await axios.get("/refresh-toke", {
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