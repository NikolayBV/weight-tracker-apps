import AuthGate from "@/components/layouts/auth-gate/AuthGate";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return <AuthGate>{children}</AuthGate>;
}