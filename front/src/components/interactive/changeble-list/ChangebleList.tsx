import React, {ComponentElement, ReactNode} from 'react';
import styles from "./ChangebleList.module.scss";
import ButtonSecondary from "../../UI/buttons/button-secondary/ButtonSecondary";
import {arrTypes} from "../../../types";
import Block from "../../UI/block/Block";
import Section from "../../UI/section/Section";


interface Props {
    title: string;
    add?: Function;
    children: ReactNode | ComponentElement<any, any>;
    items: any
}

const ChangebleList = ({title, add, children, items}: Props) => {

    const isMultiple = window.location.pathname.includes('constructor') || title === "Категория" || title === "Размер" || title === "Специальное предложение" || title === "Описание" || title === "Изображение" || title === "Свойства"
    return (
        <Section className={styles.body}>
            <h3 className={styles.title}>{title}</h3>
            <ul className={styles.list}>
                {children}
            </ul>
            {((isMultiple || !items.length) && add) &&
                <ButtonSecondary className={styles.button} onClick={() => add()}>Добавить элемент</ButtonSecondary>}
        </Section>
    );
};

export default ChangebleList;