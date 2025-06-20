import "./input.css";
import {TextInput} from "@mantine/core";

interface InputProps {
    inputTitle: string;
    value: string;
    type?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function MyInput({inputTitle, onChange, type, value}: InputProps) {
    return (
        <TextInput label={inputTitle} type={type} value={value} onChange={onChange} />
    );
}