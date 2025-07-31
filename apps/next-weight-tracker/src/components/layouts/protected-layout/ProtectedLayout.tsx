'use client';

import {useSortedWeights} from "@/utils/hooks/useSortedWeights";
import {useUserData} from "@/utils/hooks/useUserData";

interface Props {
    children: React.ReactNode;
}

export default function ProtectedLayout({ children }: Props) {
    useSortedWeights();
    useUserData();
    
    return (
        <>
            {children}
        </>
    );
}