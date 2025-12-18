import axios from "axios";
import { useRefresh } from "../../hooks/useRefresh";
import { useAppStore } from "../../store/useAppStore";


const api = axios.create({
    baseURL: "http://localhost:8000/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});



api.interceptors.request.use(
    (config) => {
        const token = useAppStore.getState().access;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes("refresh-token")
        ) {
            originalRequest._retry = true;
            const refresh = useRefresh();
            const newAccessToken = await refresh();
            if (newAccessToken) {
                api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            }
        }
        return Promise.reject(error);
    }
);

export default api;