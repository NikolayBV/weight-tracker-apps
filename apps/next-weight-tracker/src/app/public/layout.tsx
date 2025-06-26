'use client';
import "./layout.css";
import MyButton from "@/components/ui/my-button/MyButton";
import {redirect} from "next/navigation";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    function onClickLoginBtn(): void {
        redirect("/public/login");
    }
    function onClickRegisterBtn(): void {
        redirect("/public/register");
    }
    return (
        <>
            {children}
            <nav className="nav">
                <MyButton onClick={onClickLoginBtn} buttonTitle={"Вход"}></MyButton>
                <MyButton onClick={onClickRegisterBtn} buttonTitle={"Регистрация"}></MyButton>
            </nav>
        </>
    );
}