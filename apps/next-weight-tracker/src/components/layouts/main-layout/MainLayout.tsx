'use client';

import { useAuth } from "@/utils/hooks/useAuth";
import Loader from "@/components/ui/loader/Loader";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface Props {
    children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
    const { auth, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (auth) {
                router.replace('/dashboard/main');
            } else {
                router.replace('/public/login');
            }
        }
    }, [auth, loading, router]);
    
    if (loading) return <Loader />;
    
    return <>{children}</>;
}