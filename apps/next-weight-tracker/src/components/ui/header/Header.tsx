"use client";
import styles from "./header.module.css"; 
import NavBar from "@/components/ui/navBar/NavBar";
import {useAuthStore} from "@/stores/authStore";
import {useAuth} from "@/utils/hooks/useAuth";

interface HeaderProps {
    title: string;
}

export default function Header ({title}: HeaderProps) {
    const {isAuthenticated} = useAuth();
    
    return (
        <>
            <header className={styles.headerContainer}>
                <h1>{title}</h1>
                {isAuthenticated && <NavBar />}
            </header>
        </>
    );
}