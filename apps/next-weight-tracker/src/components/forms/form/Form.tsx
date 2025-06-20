"use client";
import "./form.css";
import {FormEvent} from "react";

interface FormProps {
    children: React.ReactNode;
    title?: string;
    onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
}

export default function Form({children, title, onSubmit}: FormProps) {
    return (
        <form className="form" onSubmit={onSubmit}>
            <h1 className="form__title">{title}</h1>
            <div className="form__container">
                {children}
            </div>
        </form>
    );
}