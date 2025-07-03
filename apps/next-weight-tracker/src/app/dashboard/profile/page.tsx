"use client";
import ProfileTab from "@/components/ui/profile-tab/ProfileTab";
import {useUserStore} from "@/stores/userStore";
import {Loader} from "@mantine/core";

export default function ProfilePage () {
    const userId = useUserStore(state => state.id);
    const userEmail = useUserStore(state => state.email);
    const userBirthday = useUserStore(state => state.birthdayDate);
    const userGender = useUserStore(state => state.gender);
    const userHeight = useUserStore(state => state.height);
    const user = {
        id: userId ?? '',
        email: userEmail ?? '',
        birthdayDate: userBirthday ?? '',
        gender: userGender ?? '',
        height: userHeight ?? 0,
    };
    
    if(!user) {
        return <Loader />
    }
    return (
        <ProfileTab user={user}/>
    );
}