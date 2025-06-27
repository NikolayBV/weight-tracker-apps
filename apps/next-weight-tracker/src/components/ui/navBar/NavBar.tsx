import styles from "./nav-bar.module.css";
import Link from "next/link"; 

export default function NavBar() {
    return (
        <>
            <nav className={styles.list}>
                <Link href="/dashboard/main">Дашборд</Link>
                <Link href="/dashboard/history">История</Link>
                <Link href="/dashboard/profile">Профиль</Link>
            </nav>
        </>
    );
}