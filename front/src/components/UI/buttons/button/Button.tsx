import React, {ChangeEvent, ComponentElement, MouseEventHandler, ReactNode, useEffect, useState} from 'react';
import styles from './Button.module.scss'
import {useAppSelector} from "../../../../hooks/redux";
import {Properties} from "csstype";

interface Props {
    children: ReactNode | ComponentElement<any, any>,
    onClick?: MouseEventHandler<HTMLButtonElement>,
    style?: Properties,
    className?: string,
    disabled?: boolean;
    type?: "submit" | "button"
}

const Button = ({children, onClick, style, className, disabled, type = "button"}: Props) => {
    const {isModalOpen} = useAppSelector(state => state.ui)

    const [isHover, setIsHover] = useState(false)
    const [isWave, setIsWave] = useState(false)

    useEffect(() => {
        if (isHover) {
            setIsWave(true)
            setTimeout(() => setIsWave(false), 700)
        }

    }, [isHover])

    return (
        <button
            disabled={disabled}
            style={style}
            onClick={onClick}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            className={[className, styles.button, isWave && (isModalOpen ? styles.hover_blue : styles.hover)].join(' ')}
            type={type}>
            {children}
        </button>
    );
};

export default Button;