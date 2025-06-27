"use client";
import ProfileTab from "@/components/ui/profile-tab/ProfileTab";
import {useUserStore} from "@/stores/userStore";
import {Loader} from "@mantine/core";

export default function ProfilePage () {
    const userId = useUserStore(state => state.userId);
    const userEmail = useUserStore(state => state.userEmail);
    const userBirthday = useUserStore(state => state.userBirthday);
    const userGender = useUserStore(state => state.userGender);
    const userHeight = useUserStore(state => state.userHeight);
    const user = {
        userId: userId ?? '',
        userEmail: userEmail ?? '',
        userBirthday: userBirthday ?? '',
        userGender: userGender ?? '',
        userHeight: userHeight ?? 0,
    };
    
    if(!user) {
        return <Loader />
    }
    return (
        <ProfileTab user={user}/>
    );
}