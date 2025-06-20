'use client';
import { Card, Text, Title } from '@mantine/core';
import { useUserStore } from '@/stores/userStore';
import { useWeightStore } from '@/stores/weightStore';
import { useMemo, useCallback } from 'react';
import styles from "./bmi-card.module.css"

export default function BmiCard() {
    const userHeight = useUserStore(state => state.userHeight);
    const weights = useWeightStore(state => state.userWeight);

    const lastWeight = useMemo(() => weights[weights.length - 1]?.weight, [weights]);

    const heightMeters = useMemo(() => userHeight ? userHeight / 100 : 0, [userHeight]);

    const bmi = useMemo(() => {
        return lastWeight && userHeight
            ? Number(lastWeight) / (heightMeters * heightMeters)
            : null;
    }, [lastWeight, heightMeters, userHeight]);

    const getBmiCategory = useCallback((bmi: number) => {
        if (bmi < 18.5) return 'Недостаточный вес';
        if (bmi < 25) return 'Норма';
        if (bmi < 30) return 'Избыточный вес';
        return 'Ожирение';
    }, []);

    return (
        <Card className={styles.card}  shadow="md" padding="lg" radius="md" withBorder>
            <Title order={3}>Индекс массы тела</Title>
            {bmi ? (
                <>
                    <Text>Ваш ИМТ: {bmi.toFixed(1)}</Text>
                    <Text>Категория: {getBmiCategory(bmi)}</Text>
                </>
            ) : (
                <Text>Недостаточно данных</Text>
            )}
        </Card>
    );
}