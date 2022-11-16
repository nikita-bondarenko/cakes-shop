import React from 'react';
import Button from "../../UI/buttons/button/Button";
import styles from './Counter.module.scss';

interface Props {
    value: number;
    onChange: (arg: number) => void;
    className?: string
}

const Counter = ({value, onChange, className}: Props) => {


    return (
        <div className={[styles.counter, className].join(' ')}>
            <Button className={[styles.counter__button, styles.counter__minus].join(' ')} onClick={() => onChange(value - 1)}>  -   </Button>
            <div className={styles.counter__display}>{value} шт.</div>
            <Button className={styles.counter__button}  onClick={() => onChange(value + 1)}> + </Button>
        </div>
    );
};

export default Counter;