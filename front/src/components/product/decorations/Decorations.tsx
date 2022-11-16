import React from 'react';
import {arrTypes, Decor} from "../../../types";
import {useActions} from "../../../hooks/actions";
import {useAppSelector} from "../../../hooks/redux";
import {useDeleteFileMutation} from "../../../store/file/file.api";
import DecorationInput from "./DecorationInput";
import ChangebleList from "../../interactive/changeble-list/ChangebleList";
import ButtonSecondary from "../../UI/buttons/button-secondary/ButtonSecondary";
import Block from "../../UI/block/Block";
import {useProductSelector} from "../../../hooks/useProductSelector";
import {usePropsSelector} from "../../../hooks/usePropsSelector";

const Decorations = () => {
    const type = arrTypes.DECOR
    const [deleteFile] = useDeleteFileMutation()
    const {add, update, remove} = useActions()
    const items = useProductSelector(type)

    const removePicture = (item: Decor) => {
        remove({type, body: item})
        item.picture && deleteFile(item.picture)
    }

    return (
        <ChangebleList items={items} title="Декор" add={() => add({type, body: null})}>
            {items.map((item: Decor) => (
                <li key={item.id}>
                    <Block>
                        <Block>
                            <DecorationInput  initial={item} update={item => update({type, body: item})}></DecorationInput>
                            {items.length > 1 && <ButtonSecondary type="delete" onClick={() => removePicture(item)}>Удалить
                                элемент</ButtonSecondary>}
                        </Block>
                    </Block>

                </li>
            ))}
        </ChangebleList>
    );
};

export default Decorations;