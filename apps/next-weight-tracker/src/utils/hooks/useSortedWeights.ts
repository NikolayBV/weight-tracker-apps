import { useQuery } from '@tanstack/react-query';
import { apiInstance } from '@/api/api';
import { useUserStore } from '@/stores/userStore';
import { useWeightStore } from '@/stores/weightStore';
import {useEffect, useState} from "react";

export const useSortedWeights = () => {
    const [sortBy, setSortBy] = useState<'date' | 'weight'>('date');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const userId = useUserStore((state) => state.id);
    const setUserWeight = useWeightStore((state) => state.setUserWeight);

    const handleSort = (key: 'date' | 'weight') => {
        if (sortBy === key) {
            setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortBy(key);
            setSortOrder('asc');
        }
    };
    
    const { data, isLoading, error } = useQuery({
        queryKey: ['weights', userId, sortBy, sortOrder],
        queryFn: async () => {
            if (!userId) return;
            const response = await apiInstance.getWeight({ userId, sortBy, sortOrder });
            return response?.entries || [];
        },
        enabled: !!userId,
    });
    
    useEffect(() => {
        if (data) {
            setUserWeight(data);
        }
    }, [data]);

    return {
        sortBy,
        sortOrder,
        handleSort,
        weights: data,
        isLoading,
        error,
    };
};