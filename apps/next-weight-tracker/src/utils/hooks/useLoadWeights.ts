import {useUserStore} from "@/stores/userStore";
import {useWeightStore} from "@/stores/weightStore";
import {useEffect} from "react";
import {apiInstance} from "@/api/api";

export function useLoadWeights() {
    const userId = useUserStore((state) => state.id);
    const setUserWeight = useWeightStore((state) => state.setUserWeight);

    useEffect(() => {
        if (!userId) return;
        const fetch = async () => {
            try {
                const weights = await apiInstance.getWeight({userId, sortBy: 'date', sortOrder: 'asc'});
                setUserWeight(weights.entries);
            } catch (e) {
                console.error("Ошибка при загрузке весов", e);
            }
        };
        fetch();
    }, [userId]);
}