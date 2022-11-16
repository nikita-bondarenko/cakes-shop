import React, {useEffect, useState} from 'react';
import Modal from "../Modal";
import {arrTypes} from "../../../../types";
import styles from "./DeletingConfirmModal.module.scss";
import ButtonSecondary from "../../buttons/button-secondary/ButtonSecondary";

interface Props {
    isModalOpen: boolean,
    setIsModalOpen: (arg: boolean) => void,
    deleteOne: () => void,
    text: string
}

const DeletingConfirmModal = ({isModalOpen, setIsModalOpen, deleteOne, text}: Props) => {

    return (
        <Modal isModalOpen={isModalOpen}
               setIsModalOpen={(boolean: boolean) => setIsModalOpen(boolean)}>
            <div className={styles.modal}>
                <p className={styles.text}>
                    Вы точно хотите удалить {text}?
                </p>
                <ButtonSecondary onClick={() => (setIsModalOpen(false), deleteOne())} className={styles.button}> Да,
                    точно</ButtonSecondary>
                <ButtonSecondary onClick={() => setIsModalOpen(false)} className={styles.button} type={"delete"}> Нет, я
                    передумал(а)</ButtonSecondary>
            </div>

        </Modal>
    );
};

export default DeletingConfirmModal;