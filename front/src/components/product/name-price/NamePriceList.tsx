import React from 'react';
import {NamePrice} from '../../../types'
import {useActions} from "../../../hooks/actions";
import {useAppSelector} from "../../../hooks/redux";
import NamePriceInput from "./NamePriceInput";
import ChangebleList from "../../interactive/changeble-list/ChangebleList";
import ButtonSecondary from "../../UI/buttons/button-secondary/ButtonSecondary";
import Block from "../../UI/block/Block";
import {useProductSelector} from "../../../hooks/useProductSelector";
import {usePropsSelector} from "../../../hooks/usePropsSelector";

export interface NamePriceListProps {
    title: string;
    type: "creams" | "sizes" | "nuances",
    nameLabel: string;
    priceLabel: string;
}

const NamePriceList = ({type, title, nameLabel, priceLabel}: NamePriceListProps) => {
    const {update, remove, add} = useActions()
    const items = useProductSelector(type)
    const propItems = usePropsSelector(type)
    return (
        <ChangebleList items={items} title={title} add={() => add({type, body: null})}>
            {items.map((item: NamePrice) => (
                <li key={item.id}>
                    <Block>
                        <NamePriceInput items={propItems} nameLabel={nameLabel} priceLabel={priceLabel} initial={item}
                                        update={item => update({type: type, body: item})}></NamePriceInput>
                        {items.length > 1 &&
                            <ButtonSecondary type="delete" onClick={() => remove({type: type, body: item})}>Удалить
                                элемент</ButtonSecondary>}
                    </Block>

                </li>))}
        </ChangebleList>
    )
        ;
};

export default NamePriceList;