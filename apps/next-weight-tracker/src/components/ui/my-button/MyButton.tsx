import "./button.css";
import { Button } from '@mantine/core';

interface ButtonProps {
    buttonTitle: string;
    onClick?: () => void;
    size?: string;
    type?: "button" | "submit" | "reset" | undefined;
    variant?: string;
}

export default function MyButton({buttonTitle, onClick, size, type, variant}: ButtonProps) {
    return (
        <Button size={size} onClick={onClick} variant={variant} type={type}>
            {buttonTitle}
        </Button>
    );
}