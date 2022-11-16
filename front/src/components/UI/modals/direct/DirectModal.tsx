import React, {useEffect, useState} from 'react';
import Modal from "../Modal";
import {arrTypes} from "../../../../types";
import styles from "./DirectModal.module.scss";
import ButtonSecondary from "../../buttons/button-secondary/ButtonSecondary";
import {useActions} from "../../../../hooks/actions";
import {useNavigate} from "react-router-dom";

interface Props {
    isModalOpen: boolean,
    setIsModalOpen: (arg: boolean) => void,
}

const DirectModal = ({isModalOpen, setIsModalOpen} : Props) => {

    const {setRedirectedFrom} = useActions()
    const navigate = useNavigate()

    const direct = () => {
        setRedirectedFrom(window.location.pathname)
        navigate('/auth')
    }

    return (
        <Modal isModalOpen={isModalOpen}
               setIsModalOpen={(boolean: boolean) => setIsModalOpen(boolean)}>


                    <p className={styles.text}>
                        Действие будет доступно после авторизации.
                    </p>
                    <ButtonSecondary onClick={() => (setIsModalOpen(false), direct())} className={styles.button}> Хорошо, я пройду авторизацию</ButtonSecondary>
                    <ButtonSecondary onClick={() => setIsModalOpen(false)} className={styles.button} type={"delete"}> Зашел просто посмотреть</ButtonSecondary>
        </Modal>
    );
};

export default DirectModal;