'use client';

import MyButton from "@/components/ui/my-button/MyButton";
import Form from "@/components/forms/form/Form";
import MyInput from "@/components/ui/input/MyInput";
import { Select } from '@mantine/core';
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {apiInstance} from "@/api/api";
import {useAuthStore} from "@/stores/authStore";
import {useUserStore} from "@/stores/userStore";
import {Gender} from "@/utils/types";

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthdayDate, setBirthdayDate] = useState("");
    const [height, setHeight] = useState("");
    const [gender, setGender] = useState<Gender | "">("");
    const router = useRouter();
    const setToken = useAuthStore(state => state.setAccessToken);
    const setUserId = useUserStore(state => state.setUserId);
    
    async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!email || !password || !birthdayDate || !height) {
            alert('Заполните все поля!');
            return;
        }
        const response = await apiInstance.register({email, password, birthdayDate, height, gender});
        if(response && response.token){
            setToken(response.token);
            setUserId(response.user.id);
            router.push('/dashboard');
        }
    }
    
    return (
        <Form title={"Регистрация"} onSubmit={handleRegister}>
            <MyInput inputTitle={'Email'}
                     value={email}
                     onChange={e => setEmail(e.target.value)}
                     type={"email"}
            />
            <MyInput inputTitle={'Пароль'}
                     value={password}
                     onChange={e => setPassword(e.target.value)}
                     type={"password"}
            />
            <MyInput inputTitle={'Дата рождения'}
                     value={birthdayDate}
                     onChange={e => setBirthdayDate(e.target.value)}
                     type={"date"}
            />
            <MyInput inputTitle={'Рост'}
                     value={height}
                     onChange={e => setHeight(e.target.value)}
                     type={"text"}
            />
            <Select
                label="Пол"
                placeholder="Пол"
                data={['Man', 'Woman']}
                onChange={e => setGender(e as Gender)}
            />
            <MyButton size={"xs"} buttonTitle={"Зарегистрироваться"} type={'submit'}/>
        </Form>
    );
} 