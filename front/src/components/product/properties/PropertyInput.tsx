import React, {useEffect, useState} from 'react';
import {Property} from "../../../types";
import TextNumberInput from "../../UI/inputs/text-number/TextNumberInput";

interface Props {
    update: (arg: Property) => void,
    initial: Property,
    items?: any[]

}

const PropertyInput = ({initial, update, items}: Props) => {
    const [name, setName] = useState(initial.name)
    const [value, setValue] = useState(initial.value)

    useEffect(() => {
        update({...initial, name, value})
    }, [name, value])

    useEffect(() => {
        setName(initial.name)
        setValue(initial.value)

    }, [initial])

    return (
        <div>
            <TextNumberInput update={(value: any) => update({...initial, ...value})} valueType={"name"} items={items}  label="Название свойства" onChange={value => setName(String(value))} value={String(name)}
                             type="text"/>
            <TextNumberInput label="Значение свойства" onChange={value => setValue(String(value))} value={String(value)}
                             type="text"/>
        </div>

    )
        ;
};

export default PropertyInput;