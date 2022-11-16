import React, {useEffect, useState} from 'react';
import {arrTypes, Product} from "../../../types";
import styles from "./CatalogItems.module.scss"
import Button from "../../UI/buttons/button/Button";
import ButtonSecondary from "../../UI/buttons/button-secondary/ButtonSecondary";
import {Link, useNavigate} from "react-router-dom";
import {BASE_URL_API} from "../../../config";
import Modal from "../../UI/modals/Modal";
import {useActions} from "../../../hooks/actions";
import {useLazyDeleteProductQuery} from "../../../store/product/product.api";
import Loader from "../../UI/loader/Loader";
import DeletingConfirmModal from "../../UI/modals/deleting-confirm/DeletingConfirmModal";
import {InView} from "react-intersection-observer";
import {useAppSelector} from "../../../hooks/redux";

interface Props {
    items: Product[],
    typeId: number,
    deleteItem: (arg: number) => void,
    isLoading: boolean,
}

const CatalogItems = ({items, typeId, deleteItem, isLoading}: Props) => {

    const [catalogItems, setCatalogItems] = useState([]) as [any[], Function]
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [deletingProductId, setDeletingProductId] = useState(0)
    const [deleteProduct] = useLazyDeleteProductQuery()
    const {setRedirectedFrom} = useActions()
    const {isAdmin} = useAppSelector(state => state.auth)

    useEffect(() => {
        const catalogItems = items.map(item => {
            let result: any = {}

            if (item.pictures) {
                // @ts-ignore
                const picture = item.pictures.find(picture => picture.main)
                result = picture ? {...item, imageUrl: picture.value} : {...item, imageUrl: item.pictures[0].value}
            }

            if (item && !item.price && item.sizes && item.creams) {
                // @ts-ignore
                const cheapestSize = item.sizes.find(size => item.sizes.every(i => i.price >= size.price))
                // @ts-ignore
                const cheapestCream = item.creams.find(cream => item.creams.every(i => i.price >= cream.price))

                if (cheapestSize && cheapestSize.price) result.price += cheapestSize.price
                if (cheapestCream && cheapestCream.price) result.price += cheapestCream.price

            }
            return result
        })

        setCatalogItems(catalogItems)
    }, [items])

    const toUpdate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
        e.stopPropagation()
        setRedirectedFrom(window.location.pathname)
        navigate(`/${typeId === 1 ? "cakes" : "candies"}/update/${id}`)

    }

    const toProduct = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: number) => {
        navigate(`/${typeId === 1 ? "cakes" : "candies"}/${id}`)
    }

    const openModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number) => {
        e.stopPropagation()
        setIsModalOpen(true)
        setDeletingProductId(id)
    }

    const deleteOne = () => {
        setIsModalOpen(false)
        deleteProduct(deletingProductId)
        deleteItem(deletingProductId)
        setDeletingProductId(0)

    }

    return (
        <ul className={styles.catalog}>
            {(!catalogItems.length && !isLoading) && <p className={styles.mock}>Ничего не найдено</p>}
            {catalogItems.map(item =>
                <li className={styles.li} key={item.id}>
                    <a onClick={e => toProduct(e, item.id)} className={styles.item}>
                        <img className={styles.item__image} src={BASE_URL_API + '/' + item.imageUrl} alt=""/>
                        <div className={styles.item__content}>
                            <h4 className={styles.name}>
                                {item.name}</h4>
                            <span
                                className={styles.price}>{item.sizes && item.sizes.length > 1 ? "От" : ""} {item.price} р.</span>
                            {isAdmin && <div className={styles.settings}>
                                <ButtonSecondary
                                    onClick={e => toUpdate(e, item.id)}>Изменить</ButtonSecondary>
                                <ButtonSecondary onClick={(e) => openModal(e, item.id)}
                                > Удалить</ButtonSecondary>
                            </div>}

                        </div>
                    </a>
                </li>
            )}
            <DeletingConfirmModal text={"товар"} setIsModalOpen={value => setIsModalOpen(value)}
                                  isModalOpen={isModalOpen} deleteOne={() => deleteOne()}></DeletingConfirmModal>

            {isLoading && <Loader isBig={true}
                                  className={[styles.loading, !catalogItems.length ? styles.loading_top : styles.loading_bottom].join(' ')}></Loader>}
        </ul>
    );
};

export default CatalogItems;