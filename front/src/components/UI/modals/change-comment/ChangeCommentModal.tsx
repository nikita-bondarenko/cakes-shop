import React, {useEffect, useState} from 'react';
import Modal from "../Modal";
import {arrTypes} from "../../../../types";
import styles from "./ChangeCommentModal.module.scss";
import ButtonSecondary from "../../buttons/button-secondary/ButtonSecondary";
import TextNumberInput from "../../inputs/text-number/TextNumberInput";

interface Props {
    isModalOpen: boolean,
    setIsModalOpen: (arg: boolean) => void,
    onChange: (value: string) => void,
    text: string,
}

const ChangeCommentModal = ({isModalOpen, setIsModalOpen, onChange, text} : Props) => {
    const [value, setValue] = useState(text)
    useEffect(() => { setValue(text)} , [isModalOpen])
    return (
        <Modal isModalOpen={isModalOpen}
               setIsModalOpen={(boolean: boolean) => setIsModalOpen(boolean)}>
                <TextNumberInput required={false} label={"Ваш отзыв"} type={"textarea"} onChange={value => setValue(String(value))}  value={value} ></TextNumberInput>
                <div className={styles.bottom}>
                    <ButtonSecondary onClick={() => (setIsModalOpen(false), onChange(value))} className={styles.button}> Сохранить</ButtonSecondary>
                    <ButtonSecondary onClick={() => setIsModalOpen(false)} className={styles.button} type={"delete"}> Нет, я передумал(а)</ButtonSecondary>
                </div>

        </Modal>
    );
};

export default ChangeCommentModal;