import React from 'react';
import {useActions} from "../../../hooks/actions";
import {useAppSelector} from "../../../hooks/redux";
import {arrTypes, Property} from "../../../types";

import PropertyInput from "./PropertyInput";
import ChangebleList from "../../interactive/changeble-list/ChangebleList";
import ButtonSecondary from "../../UI/buttons/button-secondary/ButtonSecondary";
import Block from "../../UI/block/Block";
import {useProductSelector} from "../../../hooks/useProductSelector";
import {usePropsSelector} from "../../../hooks/usePropsSelector";

const Properties = () => {
    const type = arrTypes.PROP
    const {update, remove, add} = useActions()
    const items = useProductSelector(type)
    const propItems = usePropsSelector(type)
    return (
   <ChangebleList items={items} title="Свойства" add={() => add({type, body: null})}>
       {items.map((item: Property) => (
           <li key={item.id}>
               <Block>
                   <PropertyInput items={propItems} initial={item} update={item => update({type, body: item})}></PropertyInput>

                       <ButtonSecondary type="delete" onClick={() => remove({type, body: item})}>Удалить
                           элемент</ButtonSecondary>
               </Block>
           </li>))}
   </ChangebleList>)
};

export default Properties;