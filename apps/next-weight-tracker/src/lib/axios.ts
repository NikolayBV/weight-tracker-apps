import axios from 'axios';
import {useAuthStore} from "@/stores/authStore";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const res = await api.post('/auth/refresh');
                const accessToken = res.data.accessToken;

                useAuthStore.getState().setAccessToken(accessToken);

                originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                console.error(`Refresh token error: ${refreshError}`);
            }
        }

        return Promise.reject(error);
    }
);

export default api;