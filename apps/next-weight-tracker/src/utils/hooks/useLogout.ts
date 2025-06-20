import { apiInstance } from '@/api/api';
import { useRouter } from 'next/navigation';
import {useAuthStore} from "@/stores/authStore";
import {useWeightStore} from "@/stores/weightStore";
import {useUserStore} from "@/stores/userStore";

export const useLogout = () => {
    const clear = useAuthStore((state) => state.clear);
    const clearUser = useUserStore(state => state.clear);
    const clearWeight =useWeightStore((state) => state.clear);
    const router = useRouter();

    return async () => {
        try {
            await apiInstance.logout();
        } catch (e) {
            console.warn('Ошибка при выходе', e);
        } finally {
            clear();
            clearWeight();
            clearUser();
            router.replace('/public/login');
        }
    };
};