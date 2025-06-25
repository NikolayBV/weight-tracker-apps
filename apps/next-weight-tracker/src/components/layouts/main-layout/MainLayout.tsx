'use client';

import {useAuth} from "@/utils/hooks/useAuth";
import ProtectedLayout from "@/components/layouts/protected-layout/ProtectedLayout";
import PublicLayout from "@/components/layouts/public-layout/PublicLayout";

interface Props {
    children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
    const {auth} = useAuth();
    const Layout = auth ? ProtectedLayout : PublicLayout;

    return (
        <Layout>{children}</Layout>
    );
}