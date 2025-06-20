'use client';
import "./layout.css";
import MyButton from "@/components/ui/my-button/MyButton";
import {redirect} from "next/navigation";
import {useAuth} from "@/utils/hooks/useAuth";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    useAuth();
    function onClickLoginBtn(): void {
        redirect("/public/login");
    }
    function onClickRegisterBtn(): void {
        redirect("/public/register");
    }
    return (
        <>
            <section>
                {children}
            </section>
            <nav className="nav">
                <MyButton onClick={onClickLoginBtn} buttonTitle={"Вход"}></MyButton>
                <MyButton onClick={onClickRegisterBtn} buttonTitle={"Регистрация"}></MyButton>
            </nav>
        </>
    );
}