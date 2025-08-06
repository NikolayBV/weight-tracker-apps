import React, {useMemo, useState} from 'react';
import {ActionIcon, Button, Menu, Modal} from "@mantine/core";
import {IconDots} from "@tabler/icons-react";
import Form from "@/components/forms/form/Form";
import MyInput from "@/components/ui/input/MyInput";
import {useDisclosure} from "@mantine/hooks";
import {Weight} from "@/utils/interfaces";
import WeightModal from "../weight-modal/WeightModal";

interface MenuButtonProps {
    weight: Weight;
} 

const MenuButton = ({ weight }: MenuButtonProps) => {
    const [opened, setOpened] = useState(false);
    const [openedModal, { open, close }] = useDisclosure(false);
    
    const handleEdit = () => {
        setOpened(!opened);
    };

    const handleEditWeight = (weight: string) => {
        console.log('Weight', weight);
    };
    
    const handleDelete = () => {
        console.log('Delete');
    }
    
    return (
        <Menu opened={opened} onChange={handleEdit}>
            <WeightModal
                title="Изменить вес"
                buttonText="Изменить"
                weight={weight} 
                openedModal={openedModal} 
                close={close}
                handleEditWeight={handleEditWeight}/>
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