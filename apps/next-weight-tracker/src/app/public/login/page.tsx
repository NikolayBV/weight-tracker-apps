'use client';
import './login.css';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import MyButton from "@/components/ui/my-button/MyButton";
import MyInput from "@/components/ui/input/MyInput";
import Form from "@/components/forms/form/Form";
import {apiInstance} from "@/api/api";
import {useAuthStore} from "@/stores/authStore";
import {useUserStore} from "@/stores/userStore";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const setToken = useAuthStore(state => state.setAccessToken);
    const setUserData = useUserStore(state => state.setUserData);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email || !password) {
            alert('Заполните все поля!');
            return;
        }
        const response = await apiInstance.login({email, password});
        if(response && response.token){
            setToken(response.token);
            setUserData(response.user)
            router.push('/dashboard');
        }
    };

    return (
        <Form title={"Вход"} onSubmit={handleLogin}>
            <MyInput value={email}
                     onChange={e => setEmail(e.target.value)}
                     inputTitle={'Email'}
                     type={"Email"}
            />

            <MyInput value={password}
                     onChange={e => setPassword(e.target.value)}
                     inputTitle={'Пароль'}
                     type={"password"}
            />

            <MyButton buttonTitle={"Войти"} type={'submit'}></MyButton>
        </Form>
    );
}