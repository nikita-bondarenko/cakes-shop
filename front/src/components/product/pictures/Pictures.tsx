import React, {useEffect, useState} from 'react';
import {arrTypes, Picture} from "../../../types";
import {useActions} from "../../../hooks/actions";
import {useAppSelector} from "../../../hooks/redux";
import PictureInput from "./PictureInput";
import {useDeleteFileMutation} from "../../../store/file/file.api";
import ChangebleList from "../../interactive/changeble-list/ChangebleList";
import {type} from "os";
import ButtonSecondary from "../../UI/buttons/button-secondary/ButtonSecondary";
import Block from "../../UI/block/Block";
import {useParams} from "react-router-dom";


const Pictures = () => {
    const type = arrTypes.PIC
    const [deleteFile] = useDeleteFileMutation()
    const {add, update, remove} = useActions()
    const {pictures} = useAppSelector(state => state.product)
    const items = pictures
    const [isCreation, setIsCreation] = useState(false)

    useEffect(() => {
        setIsCreation(window.location.pathname.includes("create"))

    }, [])
    const removePicture = (item: Picture) => {
        remove({type, body: item});
        (item.value && isCreation) && deleteFile(item.value)
    }


    return (
        <ChangebleList items={items} title="Изображение" add={() => add({type, body: null})}>
            {items.map((item) => (
                <li key={item.id}>
                    <Block>
                        <PictureInput initial={item}
                                      update={item => update({type, body: item})}></PictureInput>
                        {items.length > 1 &&
                            <ButtonSecondary type="delete" onClick={() => removePicture(item)}>Удалить
                                элемент</ButtonSecondary>}
                    </Block>
                </li>))}
        </ChangebleList>
    );
};

export default Pictures;