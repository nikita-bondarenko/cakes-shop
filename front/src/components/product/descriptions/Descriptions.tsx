import React from 'react';
import {useActions} from "../../../hooks/actions";
import {useAppSelector} from "../../../hooks/redux";
import {arrTypes, CreateDescriptionDto} from "../../../types";
import DescriptionInput from "./DescriptionInput";
import ChangebleList from "../../interactive/changeble-list/ChangebleList";
import ButtonSecondary from "../../UI/buttons/button-secondary/ButtonSecondary";
import Block from "../../UI/block/Block";
import {useProductSelector} from "../../../hooks/useProductSelector";
import {usePropsSelector} from "../../../hooks/usePropsSelector";

const Descriptions = () => {
    const type = arrTypes.DESC
    const {update, remove, add} = useActions()
    const items = useProductSelector(type)
    return (
        <ChangebleList items={items} title="Описание" add={() => add({type, body: null})}>
            {items.map((item: CreateDescriptionDto) => (
                <li key={item.id}>
                    <Block>
                        <DescriptionInput initial={item} update={item => update({type, body: item})}></DescriptionInput>
                        <ButtonSecondary type="delete" onClick={() => remove({type: type, body: item})}>Удалить
                            элемент</ButtonSecondary>
                    </Block>
                </li>))}
        </ChangebleList>

    )
};

export default Descriptions;