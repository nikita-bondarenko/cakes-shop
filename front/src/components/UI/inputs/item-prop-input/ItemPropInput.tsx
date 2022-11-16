import React, {useEffect, useState} from 'react';
import {Cake, Cream, Decor, Nuance, Size} from "../../../../types";
import {BASE_URL_API} from "../../../../config";
import ButtonCheck from "../../buttons/button-check/ButtonCheck";
import RadioInput from "../radio/RadioInput";
import styles from './ItemPropInput.module.scss'

interface Props {
    items: Cake[] | Cream[] | Decor[] | Size[] | Nuance[] | any[],
    type: "name" | "name-price" | "decor" | "nuance"  ,
    onChangeValue?: (arg: any) => void,
    onChangeValueArray?: (arg: any[]) => void,
    title: string;
    className?: string;
}

const ItemPropInput = ({items, type, onChangeValueArray, onChangeValue, title,className}: Props) => {

    const [selectedItem, setSelectedItem] = useState() as [any, Function]
    const [selectedItems, setSelectedItems] = useState([]) as [Nuance[], Function]

    useEffect(() => {
        !!items.length && setSelectedItem(items[0])
    }, [items])

    const select = (item: any) => {
        if (type === "nuance" || type === "decor") {
            selectedItems.includes(item) ? setSelectedItems(selectedItems.filter(selectedItem => selectedItem !== item)) : setSelectedItems([...selectedItems, item])
        } else {
            setSelectedItem(item)
        }
    }

    useEffect(() => {
        onChangeValue &&  onChangeValue(selectedItem)
    }, [selectedItem])

    useEffect(() => {
        onChangeValueArray &&  onChangeValueArray(selectedItems)
    }, [selectedItems])

    return (
        <div className={[styles.body, items.length > 1 || type === 'nuance' || type ==='decor' ? styles.body_column : '', className].join(' ')}>
            <p className={styles.title}>{title}:</p>
            <ul className={ [items.length > 1 ? styles.list : '', type === "decor" && styles.list_flex].join(' ')}>
                {items.map(item =>
                    <li className={styles.item} key={item.id}>
                        <div>
                             <RadioInput labelClassName={styles.label} className={styles.input} hideButton={items.length === 1 && type !== 'nuance' && type !=='decor'}
                                                           checked={type === "nuance" || type === "decor" ? !!selectedItems.find(i => item.id === i.id) : selectedItem === item}
                                                           onSelect={() => select(item)} label={[
                                ...(!!item.name ? [item.name] : []),
                                ...(!!item.price ? [`( ${item.price} р.)`] : []),
                            ].join(' ')}></RadioInput>
                        </div>
                            {!!item.picture && <img className={styles.image} src={BASE_URL_API + '/' + item.picture} alt=""/>}
                    </li>
                )}
            </ul>
        </div>
    );
};

export default ItemPropInput;