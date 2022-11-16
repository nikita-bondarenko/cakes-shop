import React, {useEffect, useState} from 'react';
import {useAppSelector} from "../../hooks/redux";
import {useActions} from "../../hooks/actions";
import {arrTypes} from "../../types";
import TextNumberInput from "../UI/inputs/text-number/TextNumberInput";
import ErrorSuccess from "../UI/inputs/error-success/ErrorSuccess";
import Block from "../UI/block/Block";

const Price = () => {
    const {price} = useAppSelector(state => state.product)
    const {set} = useActions()
    const [value, setValue] = useState(price)


    useEffect(() => {
        setValue(price)
    }, [price])

    useEffect(() => {
        set({type: arrTypes.PRICE, value})
    }, [value])
    return (
        <Block>
            <TextNumberInput label="Стоимость продукта"
                             value={value} type="number" onChange={value => setValue(Number(value))}></TextNumberInput>
        </Block>


    );
};

export default Price;