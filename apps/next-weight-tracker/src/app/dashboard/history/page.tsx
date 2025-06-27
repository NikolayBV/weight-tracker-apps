"use client";

import {useWeightStore} from "@/stores/weightStore";
import {useSortedWeights} from "@/utils/hooks/useSortedWeights";
import HistoryTab from "@/components/ui/histrory-tab/HistoryTab";

export default function HistoryPage() {
    const weights = useWeightStore((state) => state.userWeight);
    const { sortBy, sortOrder, handleSort } = useSortedWeights();
    
    return (
        <HistoryTab weights={weights} handleSort={handleSort} sortBy={sortBy} sortOrder={sortOrder} />
    );
}