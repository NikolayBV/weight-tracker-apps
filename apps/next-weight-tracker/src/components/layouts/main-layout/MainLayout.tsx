'use client';

import { useAuth } from "@/utils/hooks/useAuth";
import Loader from "@/components/ui/loader/Loader";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ProtectedLayout from "@/components/layouts/protected-layout/ProtectedLayout";
import PublicLayout from "@/components/layouts/public-layout/PublicLayout";

interface Props {
    children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading) {
            if (isAuthenticated) {
                router.replace('/dashboard/main');
            } else {
                router.replace('/public/login');
            }
        }
    }, [isAuthenticated, isLoading, router]);
    
    if (isLoading) return <Loader />;
    
    return (
        <main>
            {isAuthenticated && <ProtectedLayout>{children}</ProtectedLayout>}
            {!isAuthenticated && <PublicLayout>{children}</PublicLayout>}
        </main>
    );
}