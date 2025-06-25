'use client';

import {useSortedWeights} from "@/utils/hooks/useSortedWeights";

interface Props {
    children: React.ReactNode;
}

export default function ProtectedLayout({ children }: Props) {
    useSortedWeights();
    return (
        <>
            {children}
        </>
    );
}