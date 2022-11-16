import React, {ComponentElement, MouseEventHandler, ReactNode} from 'react';
import Button from "../button/Button";
import styles from './ButtonSecondary.module.scss'
import {useAppSelector} from "../../../../hooks/redux";
import {Properties} from "csstype";
import Loader from "../../loader/Loader";

interface Props {
    children: ReactNode | ComponentElement<any, any>,
    onClick?: MouseEventHandler<HTMLButtonElement>,
    type?: "delete" | "add",
    style?: Properties,
    className?: string,
    buttonType?: "button" | "submit"
}

const ButtonSecondary = ({children, onClick, type = "add", style, className, buttonType = "button"}: Props) => {

    const {mainColor, gray} = useAppSelector(state => state.ui)
    return (
        <Button type={buttonType} className={[className].join(' ')}
                style={{...{color: type === "add" ? `rgba(${mainColor}, 1)` : `rgba(${gray}, 1)`}, ...style}}
                onClick={onClick}>
            {children}
        </Button>
    );
};

export default ButtonSecondary;