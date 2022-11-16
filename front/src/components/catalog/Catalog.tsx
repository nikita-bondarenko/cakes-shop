import React, {useEffect, useState} from 'react';
import Filter from "./filter/Filter";
import CatalogItems from "./items/CatalogItems";
import {useLazyGetProductsQuery} from "../../store/product/product.api";
import {Product} from "../../types";
import styles from "./Catalog.module.scss";
import ButtonPrime from "../UI/buttons/button-prime/ButtonPrime";
import {useNavigate} from "react-router-dom";
import ButtonSecondary from "../UI/buttons/button-secondary/ButtonSecondary";
import {InView} from "react-intersection-observer";
import {useActions} from "../../hooks/actions";
import {useAppSelector} from "../../hooks/redux";

interface Props {
    title: string,
    typeId: number,
}

const Catalog = ({title, typeId}: Props) => {

    const [getProducts] = useLazyGetProductsQuery()
    const [filterProps, setFilterProps] = useState({})
    const [items, setItems] = useState([]) as [Product[], Function]
    const [fetching, setFetching] = useState(true)
    const [totalCount, setTotalCount] = useState(1)
    const [isLoading, setIsLoading] = useState(true)
    const {isAdmin} = useAppSelector(state => state.auth)
    const limit = 6

    const navigate = useNavigate()

    useEffect(() => {
        getItems()
    }, [filterProps])

    const getItems = async (items?: Product[] | undefined) => {
        try {
            setIsLoading(true)
            const res = await getProducts({
                ...filterProps, typeId, limit,
                ...(items ? {offset: items.length} : {})
            })
            if (res.data) {
                setItems([
                    ...(items ? items : []),
                    ...res.data.items])
                setTotalCount(res.data.pagination.count)
            }
        } finally {
            setIsLoading(false)
            setFetching(false)
        }
    }

    useEffect(() => {

        if (fetching && items.length < totalCount && !isLoading) {
            getItems(items)
        }
    }, [fetching])

    return (
        <div>
            <div className={styles.top}>
                <h1 className={styles.title}>{title}
                </h1>
                {isAdmin && <ButtonSecondary className={styles.add_button}
                    onClick={() => navigate(`/${typeId === 1 ? "cakes" : "candies"}/create`)}> Добавить</ButtonSecondary>}
                {/*<ButtonSecondary type={"delete"} className={styles.link_main} onClick={() => navigate(`/`)}>Главная</ButtonSecondary>*/}
                {/*<ButtonSecondary type={"delete"} className={styles.link_cart} onClick={() => navigate(`/cart`)}>Корзина</ButtonSecondary>*/}
            </div>

            <div className={styles.content}>
                <Filter typeId={typeId} onChange={prop => setFilterProps(prop)}></Filter>
                <CatalogItems isLoading={isLoading}
                              deleteItem={(id) => setItems(items.filter((item => item.id !== id)))} typeId={typeId}
                              items={items}></CatalogItems>
            </div>
            <InView onChange={(value ) => setFetching(value)}></InView>

        </div>

    );
};

export default Catalog;