'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/stores/userStore';
import { apiInstance } from '@/api/api';
import { useAuthStore } from '@/stores/authStore';

export const useAuth = () => {
    const router = useRouter();
    const userId = useUserStore((s) => s.userId);
    const setUserId = useUserStore((s) => s.setUserId);
    const setUserData = useUserStore((s) => s.setUserData);
    const setAccessToken = useAuthStore((s) => s.setAccessToken);

    const [loading, setLoading] = useState(true);
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        const tryRefresh = async () => {
            try {
                const res = await apiInstance.refresh();
                const accessToken = res.accessToken;
                setAccessToken(accessToken);

                const payload = JSON.parse(atob(accessToken.split('.')[1]));
                setAuth(true);
                setUserId(payload.sub);
            } catch (err) {
                console.log(err);
                setAuth(false);
            } finally {
                setLoading(false);
            }
        };

        if (!userId) {
            tryRefresh();
        } else {
            setAuth(true);
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await apiInstance.getUser(userId!!);
                setUserData(user);
            } catch (err) {
                console.log(err);
                router.replace('/public/login');
            }
        };

        if (userId) fetchUser();
    }, [userId]);

    return { loading, auth };
};