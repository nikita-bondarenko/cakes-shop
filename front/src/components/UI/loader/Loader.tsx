import React, {useEffect, useState} from 'react';
import styles from './Loader.module.scss'
import {useAppSelector} from "../../../hooks/redux";

interface Props {
    isBig?: boolean,
    className?: string,
}

const Loader = ({isBig = false, className}: Props) => {

    const [points, setPoints] = useState([]) as [number[], Function]
    const {mainColor} = useAppSelector(state => state.ui)

    useEffect(() => {
        if (isBig) {
            points.length !== 4 && setTimeout(() => setPoints([...points, Date.now()]), 100)

        } else {
            points.length !== 6 && setTimeout(() => setPoints([...points, Date.now()]), 100)
        }
    }, [points])

    return (
        <div className={[styles.loader, isBig && styles.big, className].join(' ')}>
            <div className={styles.loader__body}>
                {points.map((id) =><span key={id} className={styles.loader__point} style={{background: `rgba(${mainColor}, 1)`}}></span>)}
            </div>
        </div>
    );
};

export default Loader;