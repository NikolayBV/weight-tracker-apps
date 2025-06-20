'use client';
import {Button, Modal} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";
import MyInput from "@/components/ui/input/MyInput";
import React, {useState} from "react";
import Form from "@/components/forms/form/Form";
import {apiInstance} from "@/api/api";
import {useUserStore} from "@/stores/userStore";
import {notifications} from "@mantine/notifications";
import {useWeightStore} from "@/stores/weightStore";
import WeightChart from "@/components/ui/weight-chart/WeightChart";
import BmiCard from "@/components/bmi-card/BmiCard";
import styles from "./dashboard-tab.module.css";

export default function DashboardTab() {
    const [opened, { open, close }] = useDisclosure(false);
    const [weight, setWeight] = useState("");
    const [date, setDate] = useState("");
    const userId = useUserStore(state => state.userId);
    const setUserWeight = useWeightStore(state => state.setUserWeight);
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(weight.trim() === '' || date.trim() === ''){
            notifications.show({
                title: 'Ошибка',
                message: 'Пожалуйста, заполните все поля',
                color: 'red',
            });
        } else {
            if (!userId) {
                notifications.show({ title: 'Ошибка', message: 'Пользователь не найден', color: 'red' });
                return;
            }
            const response = await apiInstance.addWeight({userId,weight, date});
            if (response.message == "Вес успешно добавлен") {
                const weights = await apiInstance.getWeight({userId, sortBy: 'date', sortOrder: 'asc'});
                if (weights && Array.isArray(weights.entries) && weights.entries.length > 0) {
                    setUserWeight(weights.entries);
                }
                notifications.show({title: 'Успех', message: 'Вес успешно добавлен', color: 'green'});
            }
            close();
        }
    };

    return (
        <section className={styles.tab}>
            <Modal opened={opened} onClose={close} centered>
                <Form title="Добавление веса" onSubmit={(e) => handleSubmit(e)}>
                    <MyInput inputTitle={"Вес"} value={weight} type={"number"}
                             onChange={(e) => setWeight(e.target.value)}></MyInput>
                    <MyInput inputTitle={"Дата"} value={date} type={"date"}
                             onChange={(e) => setDate(e.target.value)}></MyInput>
                    <Button type={'submit'}>Добавить</Button>
                </Form>
            </Modal>

            <Button className={styles.tab__button} variant="filled" onClick={open}>
                Добавить вес
            </Button>
            <BmiCard />
            <WeightChart />
        </section>
    );
} 