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
    const { userEmail, userGender, userHeight, userBirthday, userId } = user;
    const formattedBirthday = useMemo(() => {
        return userBirthday ? new Date(userBirthday).toISOString().split('T')[0] : '';
    }, [userBirthday]);

    const [email, setEmail] = useState(userEmail);
    const [password, setPassword] = useState('');
    const [birthdayDate, setBirthdayDate] = useState(formattedBirthday);
    const [height, setHeight] = useState(userHeight);
    const [gender, setGender] = useState<Gender | "">(userGender as Gender);

        const isChanged =
            email !== (userEmail ?? "") ||
            password !== "" ||
            birthdayDate !== formattedBirthday ||
            height !== Number(userHeight ?? "") ||
            gender !== (userGender ?? "");
    
    useEffect(() => {
        setGender(userGender as Gender);
        setHeight(Number(userHeight));
        setBirthdayDate(formattedBirthday);
        setEmail(userEmail);
    }, [userEmail])

    return (
        <Form title={"Информация о пользователе"} onSubmit={(e) => {
            e.preventDefault();
            if(isChanged && userId) {
                handleEdit({email, password, birthdayDate, userId, height: String(height), gender});
            }
        }}>
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
                     value={String(height)}
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