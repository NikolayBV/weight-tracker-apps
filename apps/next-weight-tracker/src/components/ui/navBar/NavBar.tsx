import styles from "./nav-bar.module.css";
import Link from "next/link"; 

export default function NavBar() {
    return (
        <>
            <nav className={styles.list}>
                <Link href="/dashboard/main">Dashboard</Link>
                <Link href="/dashboard/history">History</Link>
                <Link href="/dashboard/profile">Profile</Link>
            </nav>
        </>
    );
}