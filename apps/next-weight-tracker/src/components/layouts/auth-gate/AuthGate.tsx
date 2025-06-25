'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {useAuth} from "@/utils/hooks/useAuth";
import Loader from "@/components/ui/loader/Loader";

export default function AuthGate({ children }: { children: React.ReactNode }) {
    const { auth, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !auth) {
            router.replace('/public/login');
        }
    }, [auth, loading]);

    if (loading || !auth) return <Loader />;

    return <>{children}</>;
}