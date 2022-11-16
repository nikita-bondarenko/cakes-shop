import React, {useEffect, useState} from 'react';
import {NameOnly} from "../../../types";
import TextNumberInput from "../../UI/inputs/text-number/TextNumberInput";
import {useAppSelector} from "../../../hooks/redux";

interface Props {
    update: (arg: NameOnly) => void,
    initial: NameOnly,
    label?: string;
    items: any[];
}

const NameOnlyInput = ({initial, update, label, items}: Props) => {
    const [value, setValue] = useState(initial.name)
    useEffect(() => {
        const item = JSON.parse(JSON.stringify(initial))
        item.name = value
        update(item)
    }, [value])


    useEffect(() => {
        setValue(initial.name)
    }, [initial])

    return (
        <TextNumberInput update={(value: any) => update({...initial, ...value})} items={items} valueType={"name"} label={label} onChange={value => setValue(String(value))} value={value}
                         type="text"/>
    );
};

export default NameOnlyInput;