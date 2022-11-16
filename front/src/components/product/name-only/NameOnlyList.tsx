import React from 'react';
import {arrTypes, NameOnly, NamePrice} from '../../../types'
import {useActions} from "../../../hooks/actions";
import {useAppSelector} from "../../../hooks/redux";
import NameOnlyInput from "./NameOnlyInput";
import Button from "../../UI/buttons/button/Button";
import ButtonSecondary from "../../UI/buttons/button-secondary/ButtonSecondary";
import Block from "../../UI/block/Block";
import styles from "./NameOnlyList.module.scss"
import ChangebleList from "../../interactive/changeble-list/ChangebleList";
import {useProductSelector} from "../../../hooks/useProductSelector";
import {usePropsSelector} from "../../../hooks/usePropsSelector";


export interface NameOnlyListProps {
    title: string;
    type: arrTypes.CAT | arrTypes.CAKE;
    label?: string;
}

const NameOnlyList = ({type, title, label} : NameOnlyListProps) => {
    const {update, remove, add} = useActions()

    const items = useProductSelector(type)
    const propItems = usePropsSelector(type)
    return (
   <ChangebleList items={items} title={title} add={() => add({type, body: null})} >
       {items.map((item: NameOnly) => (
           <li className={styles.item} key={item.id}>
               <Block>
                   <NameOnlyInput items={propItems} label={label} initial={item} update={item => update({type: type, body: item})}></NameOnlyInput>
                   {items.length > 1 && <ButtonSecondary type="delete" onClick={() => remove({type: type, body: item})}>Удалить элемент</ButtonSecondary>}
               </Block>

           </li>))}
   </ChangebleList>
    )
        ;
};

export default NameOnlyList;