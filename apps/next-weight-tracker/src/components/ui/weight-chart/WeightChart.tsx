"use client";
import { CompositeChart } from '@mantine/charts';
import {useWeightStore} from "@/stores/weightStore";
import {Box} from "@mantine/core";
import styles from "./weight-chart.module.css";

export default function WeightChart() {
    const userWeights = useWeightStore(state => state.userWeight);
    const chartData = userWeights.map((w) => ({
        id: new Date(w.date).toLocaleDateString("ru-RU"),
        weightBar: w.weight,
        weightLine: w.weight,
        weightArea: w.weight,
    }));

    return chartData.length === 0 ? (
        <p>Нет данных</p>
    ) : (
        <Box className={styles.chart}>
            <CompositeChart
                h={300}
                data={chartData}
                dataKey="id"
                maxBarWidth={30}
                series={[
                    { name: 'weightBar', color: 'rgba(18, 120, 255, 0.2)', type: 'bar' },
                    { name: 'weightLine', color: 'red.8', type: 'line' },
                    { name: 'weightArea', color: 'yellow.8', type: 'area' },
                ]}
                curveType="linear"
            />
        </Box>
    );
}