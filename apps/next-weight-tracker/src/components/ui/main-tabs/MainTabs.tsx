import "./main-tabs.css";
import { Tabs } from '@mantine/core';
import { IconDashboard, IconList, IconUser } from '@tabler/icons-react';
import DashboardTab from "@/components/ui/dashboard-tab/DashboardTab";
import HistoryTab from "@/components/ui/histrory-tab/HistoryTab";
import ProfileTab from "@/components/ui/profile-tab/ProfileTab";

export default function MainTabs() {
    return (
        <Tabs defaultValue="dashboard">
            <Tabs.List>
                <Tabs.Tab value="dashboard" leftSection={<IconDashboard size={12} />}>
                    Dashboard
                </Tabs.Tab>
                <Tabs.Tab value="history" leftSection={<IconList size={12} />}>
                    History
                </Tabs.Tab>
                <Tabs.Tab value="profile" leftSection={<IconUser size={12} />}>
                    Profile
                </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel className={"tabs__panel"} value="dashboard">
                <DashboardTab/>
            </Tabs.Panel>

            <Tabs.Panel value="history">
                <HistoryTab />
            </Tabs.Panel>

            <Tabs.Panel value="profile">
                <ProfileTab />
            </Tabs.Panel>
        </Tabs>
    );
}