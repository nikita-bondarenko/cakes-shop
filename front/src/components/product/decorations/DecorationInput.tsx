import React, {ChangeEvent, createRef, useEffect, useState} from 'react';
import {Decor, Picture} from "../../../types";
import {useDeleteFileMutation, useUploadMutation} from "../../../store/file/file.api";
import {BASE_URL_API} from "../../../config";
import {useAppSelector} from "../../../hooks/redux";
import {useActions} from "../../../hooks/actions";
import NamePriceInput from "../name-price/NamePriceInput";
import FileInput from "../../UI/inputs/file/FileInput";
import styles from "./DecorationInput.module.scss";

interface Props {
    initial: Decor,
    update: (arg: Decor) => void,
}

const DecorationInput: React.FC<Props> = ({update, initial}: Props) => {

    const [picture, setPictureValue] = useState(initial.picture)
    const [name, setName] = useState(initial.name)
    const [price, setPrice] = useState(initial.price)

    useEffect(() => {
        update({...initial, price, picture, name})
    }, [picture, name, price])



    return (
        <div>
            <FileInput className={styles.file__input} value={picture} setValue={value =>setPictureValue(value) }/>
           <NamePriceInput  nameLabel="Название декора" priceLabel="Стоимость декора" initial={initial} update={item => (setName(item.name), setPrice(item.price))}></NamePriceInput>
        </div>

    );
};

export default DecorationInput;