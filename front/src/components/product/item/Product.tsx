import React, {useEffect, useState} from 'react';
import styles from './Product.module.scss'
import {useLazyGetProductByIdQuery} from "../../../store/product/product.api";
import {Link, useNavigate, useParams} from "react-router-dom";
import PicturesDisplay from "../pictures/display/PicturesDisplay";
import ProductItemForm from "../item-form/ProductItemForm";
import ProductItemDescription from "../item-description/ProductItemDescription";
import Loader from "../../UI/loader/Loader";
import {useActions} from "../../../hooks/actions";
import {useAppSelector} from "../../../hooks/redux";
import {initialProductState} from "../../../store/product/product.slice";
import Chat from "../../chat/Chat";
import {COMMENT_WEBSOCKET_SERVER_URL} from "../../../config";
import ButtonSecondary from "../../UI/buttons/button-secondary/ButtonSecondary";

const ProductItem = () => {

    const [getProduct, {isLoading}] = useLazyGetProductByIdQuery()
    const {name} = useAppSelector(state => state.product)
    const {setProductState} = useActions()
    const {id} = useParams()
    const pageType = window.location.pathname.split("/")[1]
    const navigate = useNavigate()
    const {setRedirectedFrom} = useActions()
    const {isAdmin} = useAppSelector(state => state.auth)

    useEffect(() => {
        getProduct(Number(id)).then(res => setProductState(res.data))
        return () => {
            setProductState(initialProductState)
        }

    }, [])

    const toUpdate = () => {
        setRedirectedFrom(window.location.pathname)
        navigate(`/${pageType}/update/${id}`)
    }

    return (
        <div>
            {pageType !== "constructor" ? <h1 className={"page-title"}>
                Страница {pageType === "candies" ? 'товара' : 'торта'} "{name}"
                {/*<ButtonSecondary type={"delete"} className={styles.link_catalog}*/}
                {/*                 onClick={() => navigate(`/${pageType}`)}>Каталог</ButtonSecondary>*/}
                {/*<ButtonSecondary type={"delete"} className={styles.link_cart}*/}
                {/*                 onClick={() => navigate(`/cart`)}>Корзина</ButtonSecondary>*/}
                {isAdmin && <ButtonSecondary
                    onClick={() => toUpdate()}
                    className={styles.change_button}>
                    Изменить
                </ButtonSecondary>}

            </h1> : <h1 className={"page-title"}>
                Конструктор
                {/*<ButtonSecondary type={"delete"} className={styles.link_catalog}*/}
                {/*                 onClick={() => navigate(`/`)}>Главная</ButtonSecondary>*/}
                {/*<ButtonSecondary type={"delete"} className={styles.link_cart}*/}
                {/*                 onClick={() => navigate(`/cart`)}>Корзина</ButtonSecondary>*/}
                {isAdmin && <ButtonSecondary
                    onClick={() => (setRedirectedFrom(window.location.pathname), navigate(`/${pageType}/update/${id}`))}
                    className={styles.change_button}>
                    Изменить
                </ButtonSecondary>}

            </h1> }

            {isLoading ? <Loader isBig={true}></Loader>
                :
                <div>
                    <div className={[styles.top, pageType !== "cakes" && styles.top__flexible].join(' ')}>
                        {pageType !== "constructor" && <PicturesDisplay></PicturesDisplay>}
                        <ProductItemForm></ProductItemForm>
                    </div>
                    <ProductItemDescription></ProductItemDescription>
                </div>
            }
            <div className={styles.chat}>
                <h2 className={"section-title"}>Отзывы о товаре</h2>
                <Chat productId={Number(id)}></Chat>
            </div>
        </div>
    );
};

export default ProductItem;