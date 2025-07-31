'use client';

import { useEffect } from 'react';
import { apiInstance } from '@/api/api';
import { useAuthStore } from '@/stores/authStore';

export const useAuth = () => {
    const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
    const setLoading = useAuthStore((state) => state.setLoading);
    const setToken = useAuthStore((state) => state.setAccessToken);
    
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const isLoading = useAuthStore((state) => state.isLoading);

    const getToken = () => {
        if (typeof window !== 'undefined') {
            return useAuthStore((state) => state.accessToken) || localStorage.getItem('access_token');
        }
        return null;
    };


    const token = getToken();

    useEffect(() => {
        if (!token) {
            setAuthenticated(false);
            setLoading(false);
        } else {
            apiInstance.setToken(token);
            setToken(token);
            setAuthenticated(true);
            setLoading(false);
        }
    }, [token]);
    
    return {isAuthenticated, isLoading};
};