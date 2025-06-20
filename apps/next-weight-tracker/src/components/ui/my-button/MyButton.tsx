import "./button.css";
import { Button } from '@mantine/core';

interface ButtonProps {
    buttonTitle: string;
    onClick?: () => void;
    size?: string;
    type?: "button" | "submit" | "reset" | undefined;
}

export default function MyButton({buttonTitle, onClick, size, type}: ButtonProps) {
    return (
        <Button size={size} onClick={onClick} variant="filled" type={type}>
            {buttonTitle}
        </Button>
    );
}