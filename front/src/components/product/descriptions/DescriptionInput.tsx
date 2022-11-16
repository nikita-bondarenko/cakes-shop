import React, {useEffect, useState} from 'react';
import {CreateDescriptionDto} from "../../../types";
import TextNumberInput from "../../UI/inputs/text-number/TextNumberInput";

interface Props {
    update: (arg: CreateDescriptionDto) => void,
    initial: CreateDescriptionDto,
}

const DescriptionInput = ({initial, update}: Props) => {
    const [title, setTitle] = useState(initial.title)
    const [text, setText] = useState(initial.text)

    useEffect(() => {
        const item = JSON.parse(JSON.stringify(initial))
        item.title = title
        item.text = text
        update(item)
    }, [title, text])
    return (
        <div>
            <TextNumberInput label="Заголовок" onChange={value => setTitle(String(value))} value={String(title)}
                             type="text"/>
            <TextNumberInput label="Текст" type="textarea" value={String(text)} onChange={value => setText(String(value))}></TextNumberInput>
        </div>
    )
        ;
};

export default DescriptionInput;