import React, {ComponentElement, ReactNode} from 'react';
import Button from "../buttons/button/Button";
import styles from "./ErrorPost.module.scss"

interface Props {
    children: ReactNode | ComponentElement<any, any>,
    className?: string;

}

const ErrorPost = ({children, className} : Props) => {
    return (
        <Button className={[styles.body, className].join(' ')}>
           {children}
        </Button>
    );
};

export default ErrorPost;