import React, {useEffect, useState} from 'react';
import TextNumberInput from "../../UI/inputs/text-number/TextNumberInput";
import ButtonSecondary from "../../UI/buttons/button-secondary/ButtonSecondary";
import {CreateCategoryDto, Product} from "../../../types";
import {useLazyGetProductsQuery} from "../../../store/product/product.api";
import {useLazyGetPropQuery} from "../../../store/props/props.api";
import ErrorPost from "../../UI/error-post/ErrorPost";
import styles from "./Filter.module.scss"

export interface FilterProps {
    categoryId?: number,
    maxPrice?: number,
    minPrice?: number,
    name?: string,
}

interface Props {
    onChange: (arg: FilterProps) => void,
    typeId: number,
}

const Filter = ({onChange, typeId}: Props) => {

    const [filterProps, setFilterProps] = useState({}) as [FilterProps, Function]

    const [products, setProducts] = useState([]) as [Product[], Function]
    const [categories, setCategories] = useState([]) as [CreateCategoryDto[], Function]
    const [categoryName, setCategoryName] = useState('') as [string, Function]
    const [getProducts, {isLoading: isProductsLoading}] = useLazyGetProductsQuery()
    const [getProp, {isLoading: isPropLoading}] = useLazyGetPropQuery()
    const [isPriceError, setIsPriceError] = useState(false)

    useEffect(() => {
        getProducts({typeId}).then(res => res.data && setProducts(res.data.items))
        getProp("categories").then(res => res.data && setCategories(res.data))
    }, [])


    useEffect(() => {
        const category = categories.find(item => item.name === categoryName)
        category ?setFilterProps({...filterProps, categoryId: category.id}) : setFilterProps({name: filterProps.name})
    }, [categoryName])

    useEffect(() => {
        if (filterProps.maxPrice && filterProps.minPrice) {
            setIsPriceError(filterProps.minPrice > filterProps.maxPrice)
        } else setIsPriceError(false)

    }, [filterProps])

    return (
        <div className={styles.filter}>
            <h2 className={"section-title"}>Фильтр</h2>
            <TextNumberInput label={"Строка в названии"} required={false} value={filterProps.name || ""}
                             items={products}
                             valueType={"name"}
                             onChange={value => setFilterProps({...filterProps, name: value})}
                             update={((value: { name: string; }) => setFilterProps({
                                 ...filterProps,
                                 name: value.name
                             }))}></TextNumberInput>
            {typeId === 1 &&
                <TextNumberInput label={"Категория"} required={false} value={categoryName}
                                 valueType={"name"} items={categories}
                                 onChange={value => setCategoryName(value)}
                                 update={(item: { name: string; }) => setCategoryName(item.name)}
                                 error={(!filterProps.categoryId && categoryName) && "Такой категории нет"}
                ></TextNumberInput>}
            {typeId === 3 &&
                <TextNumberInput type={"number"} label={"Мин. стоимость"} required={false} value={filterProps.minPrice}
                                 onChange={value => setFilterProps({
                                     ...filterProps,
                                     minPrice: value
                                 })}></TextNumberInput>}
            {typeId === 3 &&
                <TextNumberInput type={"number"} label={"Макс. стоимость"} required={false} value={filterProps.maxPrice}
                                 onChange={value => setFilterProps({
                                     ...filterProps,
                                     maxPrice: value
                                 })}></TextNumberInput>}
            <div className={styles.buttons}>
                <ButtonSecondary className={[isPriceError || !Object.values(filterProps).some(value => !!value) ? "disabled" : '', styles.button].join(' ')} onClick={() => onChange(filterProps)}> Применить настройки</ButtonSecondary>
                {Object.values(filterProps).some(value => !!value) &&
                    <ButtonSecondary className={styles.button} type={"delete"} onClick={() => (onChange({}), setFilterProps({}), setCategoryName(''))}> Сбросить</ButtonSecondary>}
            </div>

            {isPriceError &&
                <ErrorPost className={styles.error}>Минимальная цена не должна привышать максимальную</ErrorPost>}
        </div>
    );
};

export default Filter;