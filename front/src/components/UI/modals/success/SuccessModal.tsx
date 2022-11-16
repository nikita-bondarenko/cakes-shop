import React, {useEffect, useState} from 'react';
import Modal from "../Modal";
import {arrTypes} from "../../../../types";
import styles from "./SuccessModal.module.scss";
import ButtonSecondary from "../../buttons/button-secondary/ButtonSecondary";
import {useActions} from "../../../../hooks/actions";
import {useNavigate} from "react-router-dom";

interface Props {
    isModalOpen: boolean,
    setIsModalOpen: (arg: boolean) => void,
}

const SuccessModal = ({isModalOpen, setIsModalOpen} : Props) => {

    const navigate = useNavigate()

    const direct = () => {
        navigate('/cart')
    }

    return (
        <Modal isModalOpen={isModalOpen}
               setIsModalOpen={(boolean: boolean) => setIsModalOpen(boolean)}>


            <p className={styles.text}>
                Товар успешно добавлен в&nbsp;корзину.
            </p>
            <ButtonSecondary onClick={() => (setIsModalOpen(false), direct())} className={styles.button}> Перейти в корзину</ButtonSecondary>
            <ButtonSecondary onClick={() => setIsModalOpen(false)} className={styles.button} type={"delete"}> Остаться на странице</ButtonSecondary>
        </Modal>
    );
};

export default SuccessModal;