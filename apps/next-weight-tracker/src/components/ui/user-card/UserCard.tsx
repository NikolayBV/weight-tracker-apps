import React, {useEffect, useMemo, useState} from "react";
import Form from "@/components/forms/form/Form";
import {UpdateUserData, User} from "@/utils/interfaces";
import {Button, Select} from "@mantine/core";
import MyInput from "@/components/ui/input/MyInput";
import {Gender} from "@/utils/types";

interface UserCardProps {
    user: User;
    handleEdit: (data: UpdateUserData) => Promise<void>;
}

    export default function UserCard({ user, handleEdit }: UserCardProps) {
    const { id, gender, height, email, birthdayDate } = user;
    const formattedBirthday = useMemo(() => {
        return birthdayDate ? new Date(birthdayDate).toISOString().split('T')[0] : '';
    }, [birthdayDate]);

    const [userEmail, setEmail] = useState(email);
    const [password, setPassword] = useState('');
    const [userBirthdayDate, setBirthdayDate] = useState(formattedBirthday);
    const [userHeight, setHeight] = useState(height);
    const [userGender, setGender] = useState<Gender | "">(gender as Gender);

        const isChanged =
            email !== (email ?? "") ||
            password !== "" ||
            birthdayDate !== formattedBirthday ||
            height !== Number(height ?? "") ||
            gender !== (gender ?? "");
    
    useEffect(() => {
        setGender(gender as Gender);
        setHeight(Number(height));
        setBirthdayDate(formattedBirthday);
        setEmail(email);
    }, [email])

    return (
        <Form title={"Информация о пользователе"} onSubmit={(e) => {
            e.preventDefault();
            if(isChanged && id) {
                handleEdit({email: userEmail, password, birthdayDate: userBirthdayDate, id, height: String(userHeight), gender: userGender});
            }
        }}>
            <MyInput inputTitle={'Email'}
                     value={userEmail}
                     onChange={e => setEmail(e.target.value)}
                     type={"email"}
            />
            <MyInput inputTitle={'Пароль'}
                     value={password}
                     onChange={e => setPassword(e.target.value)}
                     type={"password"}
            />
            <MyInput inputTitle={'Дата рождения'}
                     value={userBirthdayDate}
                     onChange={e => setBirthdayDate(e.target.value)}
                     type={"date"}
            />
            <MyInput inputTitle={'Рост'}
                     value={String(userHeight)}
                     onChange={e => setHeight(+e.target.value)}
                     type={"text"}
            />
            <Select
                label="Пол"
                placeholder="Пол"
                value={userGender}
                data={['Man', 'Woman']}
                onChange={e => setGender(e as Gender)}
            />
            <Button size={"xs"} variant={"filled"} type={'submit'} disabled={!isChanged}>Изменить</Button>
        </Form>
    );
}