'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/stores/userStore';
import { apiInstance } from '@/api/api';
import { useAuthStore } from '@/stores/authStore';

export const useAuth = () => {
    const router = useRouter();
    const userId = useUserStore((state) => state.userId);
    const setUserId = useUserStore((state) => state.setUserId);
    const setUserData = useUserStore((state) => state.setUserData);
    const setAccessToken = useAuthStore((state) => state.setAccessToken);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        if (!userId) {
            const tryRefresh = async () => {
                try {
                    const res = await apiInstance.refresh();
                    const accessToken = res.accessToken;
                    setAccessToken(accessToken);

                    const payload = JSON.parse(atob(accessToken.split('.')[1]));
                    setUserId(payload.sub);
                } catch (err) {
                    router.replace('/public/login');
                    console.log(err)
                }
            };

            tryRefresh();
        }
    }, []);
    
    useEffect(() => {
        if (userId) {
            const fetchUser = async () => {
                try {
                    const user = await apiInstance.getUser(userId);
                    if(user) {
                        setUserData(user);   
                        router.replace('/dashboard');
                    }
                } catch (err) {
                    router.replace('/public/login');
                    console.log(err)
                } finally {
                    setLoading(false);
                }
            };

            fetchUser();
        }
    }, [userId]);

    return { loading };
};