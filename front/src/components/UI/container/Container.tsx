import React, {ComponentElement, ReactNode} from 'react';
import styles from './Container.module.scss'

interface Props {
    children: ReactNode | ComponentElement<any, any>
}

const Container = ({children} : Props) => {
    return (
        <div className={styles.container}>
            {children}
        </div>
    );
};

export default Container;