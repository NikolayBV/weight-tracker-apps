import MyButton from "@/components/ui/my-button/MyButton";
import {useLogout} from "@/utils/hooks/useLogout";
import styles from "./profile-tab.module.css";
import {Box} from "@mantine/core";

export default function ProfileTab() {
    const handleLogout = useLogout();
    
    return (
        <Box className={styles.tab}>
            <MyButton buttonTitle={"Выйти"} size={"xs"} onClick={handleLogout}/>
        </Box>
    );
}