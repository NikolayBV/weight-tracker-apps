'use client';
import DashboardTab from "@/components/ui/dashboard-tab/DashboardTab";
import {useSortedWeights} from "@/utils/hooks/useSortedWeights";

export default function MainTab() {
    useSortedWeights();
    return (
        <DashboardTab />
    );
}