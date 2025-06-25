"use client";
import styles from "./header.module.css"; 
import NavBar from "@/components/ui/navBar/NavBar";
import {useAuthStore} from "@/stores/authStore";

interface HeaderProps {
    title: string;
}

export default function Header ({title}: HeaderProps) {
    const token = useAuthStore(state => state.accessToken);
    
    return (
        <>
            <header className={styles.headerContainer}>
                <h1>{title}</h1>
                {token && <NavBar />}
            </header>
        </>
    );
}