import React, {useEffect, useState} from 'react';
import {Cream, CreateCategoryDto, NamePrice} from "../../../types";
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;
import TextNumberInput from "../../UI/inputs/text-number/TextNumberInput";
import {useAppSelector} from "../../../hooks/redux";

interface Props {
    update: (arg: NamePrice) => void,
    initial: NamePrice,
    nameLabel?: string;
    priceLabel?: string;
    items?: any[]
}

const NamePriceInput = ({initial, update, nameLabel, priceLabel, items}: Props) => {
    const [name, setName] = useState(initial.name)
    const [price, setPrice] = useState(initial.price)

    useEffect(() => {
        initial = {...initial, name, price}
        update(initial)
    }, [name, price])

    useEffect(() => {
        setName(initial.name)
        setPrice(initial.price)

    }, [initial])

    return (
        <div>
            <TextNumberInput update={(value: any) => update({...initial, ...value})} valueType={"name"} items={items} label={nameLabel} onChange={value => setName(String(value))} value={name} type="text"/>
            <TextNumberInput  required={priceLabel?.includes('товара' || 'специального')} label={priceLabel} onChange={value => setPrice(Number(value))} value={price} type="number"/>
        </div>
    )
        ;
};

export default NamePriceInput;