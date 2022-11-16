import React, {FC, useEffect, useState} from 'react';
import {useDebounce} from "../../hooks/useDebounce";
import {useFetching} from "../../hooks/useFetching";
import axios from "axios";
import {BASE_URL_API} from "../../config";
import {useAppSelector} from "../../hooks/redux";
import {useActions} from "../../hooks/actions";
import {useIsNameUniqueMutation} from "../../store/product/product.api";
import {arrTypes} from "../../types";
import TextNumberInput from '../UI/inputs/text-number/TextNumberInput';
import Block from "../UI/block/Block";
import {useParams} from "react-router-dom";

const Name = () => {
    const {name} = useAppSelector(state => state.product)
    const {set} = useActions()
    const [isUnique, setIsNameUnique] = useState(true)
    const [value, setValue] = useState(name)
    const debounced = useDebounce(value)
    const [isNameUnique, {isLoading, error, data}] = useIsNameUniqueMutation()

    const {id} = useParams()

    useEffect(() => {
        debounced.trim().length && isNameUnique({name: debounced, id})
    }, [debounced])

    useEffect(() => {
        setValue(name)
    }, [name])

    useEffect(() => {
        data !== undefined && setIsNameUnique(data)
        data && set({type: arrTypes.NAME, value: debounced})
    }, [data])

    // @ts-ignore
    return (
        <Block>
            <TextNumberInput label="Название продукта" loading={isLoading} success={!!(isUnique && value.trim().length && value === debounced)}
                             error={!isUnique && 'Это название уже используется.'}
                             value={value} onChange={(value) => setValue(String(value))}></TextNumberInput>
        </Block>

    );
};

export default Name;