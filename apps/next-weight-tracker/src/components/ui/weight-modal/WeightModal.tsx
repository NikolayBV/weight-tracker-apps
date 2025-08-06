import React, {useMemo, useState} from 'react';
import Form from "@/components/forms/form/Form";
import MyInput from "@/components/ui/input/MyInput";
import {Button, Modal} from "@mantine/core";
import {Weight} from "@/utils/interfaces";

interface WeightModalProps {
    openedModal: boolean;
    close: () => void;
    weight: Weight;
    handleEditWeight: (weight: string) => void;
    title: string;
    buttonText: string;
}

const WeightModal = ({openedModal, close, weight, handleEditWeight, title, buttonText} : WeightModalProps) => {
    const [userWeight, setUserWeight] = useState(weight.weight);
    const [date, setDate] = useState(weight.date);

    const formatWeight = new Date(date).toISOString().split('T')[0];
    
    return (
        <Modal opened={openedModal} onClose={close} centered>
            <Form title={title} onSubmit={(e) => {
                e.preventDefault();
                handleEditWeight(userWeight)
            }}>
                <MyInput inputTitle={"Вес"} value={userWeight} type={"number"}
                         onChange={(e) => setUserWeight(e.target.value)}></MyInput>
                <MyInput inputTitle={"Дата"} value={formatWeight} type={"date"}
                         onChange={(e) => setDate(e.target.value)}></MyInput>
                <Button type={'submit'}>{buttonText}</Button>
            </Form>
        </Modal>
    );
};

export default React.memo(WeightModal);