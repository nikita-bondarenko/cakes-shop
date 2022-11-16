import React, {ComponentElement, MouseEventHandler, ReactNode} from 'react';
import Button from "../button/Button";
import styles from "./ButtonPrime.module.scss"
import Loader from "../../loader/Loader";

interface Props {
    children: ReactNode | ComponentElement<any, any>;
    className?: string;
    disabled?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
    isLoading?: boolean;
    type?: "submit" | 'button'
}

const ButtonPrime = ({children, className, disabled = false, onClick, isLoading, type}: Props) => {
    return (
     <div className={[styles.body, "column"].join(' ')}>
         <Button type={type} onClick={onClick} className={[styles.button, className, disabled && styles.disabled].join(' ')}>
             {children}
         </Button>
         {
             isLoading && <Loader className={styles.loading}></Loader>
         }
     </div>
    )
    ;
};

export default ButtonPrime;