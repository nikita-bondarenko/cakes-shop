import React, {MouseEventHandler, useEffect} from 'react';
import Button from "../button/Button";
import styles from './ButtonCheck.module.scss';

interface Props {
    checked: boolean;
    onClick: MouseEventHandler<HTMLButtonElement>
}

const ButtonCheck = ({checked, onClick} : Props ) => {

    return (
       <Button onClick={onClick} className={styles.body}>
          <div className={[styles.point, checked && styles.checked].join(' ')}></div>
       </Button>
    );
};

export default ButtonCheck;