import {useAuthStore} from "@/stores/authStore";
import {useEffect} from "react";
import {apiInstance} from "@/api/api";
import {useUserStore} from "@/stores/userStore";

export const useUserData = () => {
    const accessToken = useAuthStore((state) => state.accessToken);
    const setUserData = useUserStore((state) => state.setUserData);

    useEffect(() => {
        const fetchUserData = async (userId: string) => {
            try {
                const user = await apiInstance.getUser(userId);
                if (user) {
                    setUserData(user);
                }
            } catch (e) {
                console.error('Ошибка загрузки данных пользователя', e);
            }
        }
        
        if(accessToken) {
            const payload = JSON.parse(atob(accessToken.split('.')[1]));
            const userId = payload.sub;
            if (userId) {
                fetchUserData(userId);
            }
        }
    }, [accessToken]);
} 