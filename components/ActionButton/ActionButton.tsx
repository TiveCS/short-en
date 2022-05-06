import {MouseEventHandler} from "react";
import {Button} from "@chakra-ui/react";

interface ButtonProps {
    text: string;
    type: "submit" | "reset" | "button" | undefined;
    onClick: MouseEventHandler<HTMLButtonElement> | undefined;
    isLoading?: boolean
}

export default function ActionButton({text, type, onClick, isLoading=false}: ButtonProps) {
    return (
        <Button bg={'cyan.400'} color={'whiteAlpha.900'}
                type={type}
                isLoading={isLoading}
                onClick={onClick}
        >{text}</Button>
    );
}