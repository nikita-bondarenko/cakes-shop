import React, {ComponentElement, ReactNode, useEffect, useMemo, useState} from 'react';
import Loader from "../../loader/Loader";
import styles from "./ErrorSuccess.module.scss"
import {useAppSelector} from "../../../../hooks/redux";
import {useActions} from "../../../../hooks/actions";
import {arrTypes} from "../../../../types";
import {type} from "os";

interface Props {
    error?: string | false;
    success?: boolean;
    loading?: boolean;
    children: ReactNode | ComponentElement<any, any>;
    className?: string;

}

const ErrorSuccess = ({error, success, loading, children, className}: Props) => {

    const {addError, deleteError} = useActions()

    const random = Math.floor(Math.random() * 10000)

    const [id] = useState(random)

    useEffect(() => {
        if (error || loading) addError(id)
        if (!error && !loading) deleteError(id)
        return () => {
            deleteError(id)
        }
    }, [error, loading])

    const {isModalOpen} = useAppSelector(state => state.ui)
    return (
        <div className={[styles.body, className].join(' ')}>
            {children}
            <div className={styles.sign}>
                {(loading) && <Loader className={styles.loader}></Loader>}
                {(success && !loading) && <span className={[styles.success, isModalOpen && styles.blue].join(' ')}> Поле заполненно корректно </span>}
                {(error && !loading) && <span className={styles.error}> {error}</span>}
            </div>
        </div>
    );
};

export default ErrorSuccess;