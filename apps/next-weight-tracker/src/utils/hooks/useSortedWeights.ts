import { useState, useEffect } from 'react';
import { apiInstance } from '@/api/api';
import { useUserStore } from '@/stores/userStore';
import { useWeightStore } from '@/stores/weightStore';

export const useSortedWeights = () => {
    const [sortBy, setSortBy] = useState<'date' | 'weight'>('date');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const userId = useUserStore((state) => state.userId);
    const setUserWeight = useWeightStore((state) => state.setUserWeight);

    const fetchWeights = async () => {
        try {
            if (!userId || !sortBy || !sortOrder) return;
            const response = await apiInstance.getWeight({ userId, sortBy, sortOrder });
            if (response?.entries) {
                setUserWeight(response.entries);
            }
        } catch (e) {
            console.error('Ошибка загрузки весов:', e);
        }
    }

    useEffect(() => {
        fetchWeights();
    }, [userId, sortBy, sortOrder]);

    const handleSort = (key: 'date' | 'weight') => {
        if (sortBy === key) {
            setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortBy(key);
            setSortOrder('asc');
        }
    };

    return {
        sortBy,
        sortOrder,
        handleSort,
    };
};