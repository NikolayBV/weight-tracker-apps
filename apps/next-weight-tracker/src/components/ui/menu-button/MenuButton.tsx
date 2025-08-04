import React, {useState} from 'react';
import {ActionIcon, Button, Menu, Modal} from "@mantine/core";
import {IconDots} from "@tabler/icons-react";
import Form from "@/components/forms/form/Form";
import MyInput from "@/components/ui/input/MyInput";
import {useDisclosure} from "@mantine/hooks";
import {Weight} from "@/utils/interfaces";

interface MenuButtonProps {
    weight: Weight;
} 

const MenuButton = ({ weight }: MenuButtonProps) => {
    const [opened, setOpened] = useState(false);
    const [userWeight, setUserWeight] = useState(weight.weight);
    const [date, setDate] = useState(weight.date);
    const [openedModal, { open, close }] = useDisclosure(false);

    console.log(weight);
    
    const handleEdit = () => {
        setOpened(!opened);
    };

    const handleEditWeight = () => {
        console.log('Edit weight');
    };
    
    const handleDelete = () => {
        console.log('Delete');
    }
    
    return (
        <Menu opened={opened} onChange={handleEdit}>
            <Modal opened={openedModal} onClose={close} centered>
                <Form title="Изменить вес" onSubmit={handleEditWeight}>
                    <MyInput inputTitle={"Вес"} value={userWeight} type={"number"}
                             onChange={(e) => setUserWeight(e.target.value)}></MyInput>
                    <MyInput inputTitle={"Дата"} value={new Date(date).toISOString().split('T')[0]} type={"date"}
                             onChange={(e) => setDate(e.target.value)}></MyInput>
                    <Button type={'submit'}>Изменить</Button>
                </Form>
            </Modal>
            <Menu.Target>
                <ActionIcon variant="outline">
                    <IconDots size={18} stroke={1.5} />
                </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item onClick={open}>
                    Изменить
                </Menu.Item>
                <Menu.Item onClick={handleDelete}>
                    Удалить
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};

export default MenuButton;