import React, {createRef, useEffect,  useState} from 'react';
import ErrorSuccess from "../error-success/ErrorSuccess";
import {useAppSelector} from "../../../../hooks/redux";
import styles from './TextNumberInput.module.scss'
import Textarea from "../../textarea/Textarea";

interface Props {
    value: string | number | null | undefined,
    type?: 'text' | "number" | "textarea" | "email" | "password",
    error?: string | false;
    success?: boolean;
    loading?: boolean;
    onChange: (value: string | number) => void;
    label?: string;
    required?: boolean;
    valueType?: string;
    items?: any[];
    update?: Function,
    rows?: number
}

const TextNumberInput = (
    {
        value,
        onChange,
        error,
        success,
        loading,
        type = 'text',
        label,
        required = true,
        valueType,
        items,
        update,
        rows
    }: Props
) => {

    const {mainColor, gray, isModalOpen} = useAppSelector(state => state.ui)
    const ref = createRef<HTMLInputElement>()
    const [hasFocus, setHasFocus] = useState(false)
    const [isLabelUp, setIsLabelUp] = useState(true)
    const [selectItems, setSelectItems] = useState(items || [])
    const [isMouseOverSelect, setIsMouseOverSelect] = useState(false)

    useEffect(() => {
        setIsLabelUp(hasFocus || !!value)
    }, [value, hasFocus])

    useEffect(() => {
        if (hasFocus && valueType && items) {
            setSelectItems(items.filter(item => item[valueType].toLowerCase().includes(String(value).toLowerCase())))
        }
    }, [hasFocus, value, items])

    const select = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.TouchEvent<HTMLButtonElement> , item: any) => {
        const value = JSON.parse(JSON.stringify(item))
        delete value.id
        update && update(value)
        setHasFocus(false)
    }

    return (
        <ErrorSuccess error={!loading && ((!value && required) ? "Поле не должно быть пустым" : error)}
                      success={success}
                      loading={loading}>
            <label htmlFor=""
            >
                <div className={[isModalOpen ? styles.blue : styles.red, isLabelUp && styles.use].join(' ')}>
                    {type === "textarea"
                        ?
                        <Textarea
                            rows={rows}
                            className={[styles.input, styles.textarea].join(' ')}
                            style={{color: success || !error ? `rgba(${mainColor}, 1)` : `rgba(${gray}, 1)`}}
                            onChange={(e) => onChange(e.target.value)}
                            onFocus={() => setHasFocus(true)}
                            onBlur={() => setHasFocus(false)}
                            value={value ? String(value) : ''}
                        ></Textarea>
                        :
                        <input className={[styles.input].join(' ')}
                               style={{color: success || !error ? `rgba(${mainColor}, 1)` : `rgba(${gray}, 1)`}}
                               onFocus={() => setHasFocus(true)}
                               onBlur={() => !isMouseOverSelect && setHasFocus(false)}
                               ref={ref} value={value ? value : ''}
                               onChange={(e) => onChange(e.target.value)} type={type} autoComplete="off" required/>
                    }

                    <span className={[styles.label, isLabelUp && styles.label__up].join(' ')}>
                    {label}
                </span>

                    <ul style={{display: hasFocus ? "flex" : "none"}} className={styles.hint}
                        onMouseEnter={() => setIsMouseOverSelect(true)}
                        onMouseLeave={() => setIsMouseOverSelect(false)}>
                        {selectItems.map(item =>
                            <li className={styles.hint__item} key={item.id}>
                                <button className={styles.hint__button}
                                        onTouchEnd={(e) => select(e, item)}
                                        onClick={(e) => select(e, item)}>{valueType ? item[valueType] : ''}{valueType && item.price && selectItems.some(selectItem => selectItem[valueType] === item[valueType] && selectItem.id !== item.id) ? ` (${item.price})` : ''}{valueType && item.value && selectItems.some(selectItem => selectItem[valueType] === item[valueType] && selectItem.id !== item.id) ? item.value.length > 10 ? ` (${item.value.substr(0, 9)}...)` : ` (${item.value})` : ''}</button>
                            </li>)}
                    </ul>

                </div>
            </label>
        </ErrorSuccess>

    );
};

export default TextNumberInput;