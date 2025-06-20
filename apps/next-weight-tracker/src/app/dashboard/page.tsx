'use client';

import Layout from "@/app/dashboard/layout";
import {useAuth} from "@/utils/hooks/useAuth";
import MainTabs from "@/components/ui/main-tabs/MainTabs";
import { useSortedWeights } from "@/utils/hooks/useSortedWeights";

export default function DashboardPage() {
    useAuth();
    useSortedWeights();
    
    return (
        <Layout>
            <MainTabs />
        </Layout>
    );
}