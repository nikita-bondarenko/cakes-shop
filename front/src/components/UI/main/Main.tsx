import React, {ComponentElement, ReactNode} from 'react';
import styles from './Main.module.scss'

interface Props {
    children: ReactNode | ComponentElement<any, any>
}

const Main = ({children} : Props) => {
    return (
        <main className={styles.main}>
            {children}
        </main>
    );
};

export default Main;