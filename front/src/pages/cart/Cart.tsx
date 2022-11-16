import React, {useEffect, useState} from 'react';
import {useAppSelector} from "../../hooks/redux";
import {useNavigate} from "react-router-dom";
import {ProductInCart, ProductInCartFromRepository} from "../../types";
import {useDeleteCartItemMutation, useLazyGetCartByIdQuery, useMakeOrderMutation} from "../../store/cart/cart.api";
import Loader from "../../components/UI/loader/Loader";
import {BASE_URL_API, JWT_KEY} from "../../config";
import CartItem from "./item/CartItem";
import ButtonPrime from "../../components/UI/buttons/button-prime/ButtonPrime";
import TextNumberInput from "../../components/UI/inputs/text-number/TextNumberInput";
import DeletingConfirmModal from "../../components/UI/modals/deleting-confirm/DeletingConfirmModal";
import styles from './Cart.module.scss'

const Cart = () => {

    const {user} = useAppSelector(state => state.user)
    const navigate = useNavigate()
    const [products, setProducts] = useState([]) as [ProductInCartFromRepository[], Function]
    const [getCart, {isLoading}] = useLazyGetCartByIdQuery()
    const [finalPrice, setFinalPrice] = useState(0)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [deletingItemId, setDeletingItemId] = useState(0)
    const [deleteOne] = useDeleteCartItemMutation()

    useEffect(() => {
        if (!localStorage.getItem(JWT_KEY)) {
            navigate('/auth')
        }

    }, [])

    useEffect(() => {
        if (user.id) {
            getCart(user.activeCart.id).then(res => res.data && setProducts(res.data.productsInCart))
        }
    }, [user])

    useEffect(() => {
        const price = products.reduce((acc, item) => acc + item.price * item.quantity, 0)
        setFinalPrice(price)
    }, [products])

    const startDelete = (id: number) => {
        setDeletingItemId(id)
        setIsDeleteModalOpen(true)
    }

    const deleteItem = () => {
        setProducts(products.filter(product => product.id !== deletingItemId))
        deleteOne(deletingItemId)
        setDeletingItemId(0)
    }



    return (
        <div >
            <h1 className={"page-title"}>
                Корзина
            </h1>
            {isLoading ? <Loader isBig={true}></Loader> :
                products.length ? <div className={["column", styles.body].join(' ')}>
                    <ul className={styles.list}>
                        {products.map(item =>
                            <CartItem onDelete={() => startDelete(Number(item.id))} key={item.id} item={item}
                                      items={products}
                                      setProducts={(items) => setProducts(items)}></CartItem>
                        )}
                    </ul>

                    <div className={styles.price}>
                        <span className={styles.text}>Итого:</span>
                        <span className={styles.value}>{finalPrice} р.</span>
                    </div>
                    <ButtonPrime onClick={() => navigate('/order')}>Оформить заказ</ButtonPrime>

                </div> : <p className={styles.mock}>Корзина пуста</p>
            }

            <DeletingConfirmModal deleteOne={() => deleteItem()} text={"товар из корзины"}
                                  setIsModalOpen={value => setIsDeleteModalOpen(value)}
                                  isModalOpen={isDeleteModalOpen}></DeletingConfirmModal>
        </div>
    );
};

export default Cart;