import {useLogout} from "@/utils/hooks/useLogout";
import styles from "./profile-tab.module.css";
import {Box} from "@mantine/core";
import UserCard from "@/components/ui/user-card/UserCard";
import React, {useCallback} from "react";
import MyButton from "@/components/ui/my-button/MyButton";
import Loader from "@/components/ui/loader/Loader";
import {UpdateUserData, User} from "@/utils/interfaces";
import {apiInstance} from "@/api/api";

export default function ProfileTab({user}: {user: User}) {  
    const handleLogout = useLogout();
    const handleEditUser = useCallback(async (data: UpdateUserData) => {
        await apiInstance.updateUser(data);
    }, [user.userId]);
    const handeDelete = useCallback(() => {}, []);

    if(!user) {
        return <Loader />
    }
    
    return (
        <Box className={styles.tab}>
            {user && <UserCard user={user} handleEdit={handleEditUser} />}
            <div className={styles.tab__buttons}>
                <MyButton buttonTitle={"Выйти"} size={"xs"} variant={"default"} onClick={handleLogout}/>
                <MyButton buttonTitle={"Удалить"} size={"xs"} variant={"default"} onClick={handeDelete}/>
            </div>
        </Box>
    );
}