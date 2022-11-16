import React, {ComponentElement, ReactNode} from 'react';
import {Properties} from "csstype";
import styles from './Block.module.scss'


interface Props {
    children: ReactNode | ComponentElement<any, any>,
    style?: Properties,
    className?: string
}

const Block = ({children, style, className}: Props) => {
    return (
        <div style={style} className={[styles.block, className].join(' ')}>
            {children}
        </div>
    );
};

export default Block;