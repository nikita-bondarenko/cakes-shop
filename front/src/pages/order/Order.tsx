import React, {useEffect, useState} from 'react';
import TextNumberInput from "../../components/UI/inputs/text-number/TextNumberInput";
import ErrorPost from "../../components/UI/error-post/ErrorPost";
import ButtonPrime from "../../components/UI/buttons/button-prime/ButtonPrime";
import {useLazyGetCartByIdQuery, useMakeOrderMutation} from "../../store/cart/cart.api";
import {useAppSelector} from "../../hooks/redux";
import {JWT_KEY} from "../../config";
import {useNavigate} from "react-router-dom";
import {Cart} from "../../types";
import Modal from "../../components/UI/modals/Modal";
import ButtonSecondary from "../../components/UI/buttons/button-secondary/ButtonSecondary";
import {useLazyGetOneQuery} from "../../store/user/user.api";
import {decodeToken} from "react-jwt";
import {useActions} from "../../hooks/actions";
import styles from './Order.module.scss';
import Section from "../../components/UI/section/Section";

const Order = () => {
    const [description, setDescription] = useState('')
    const [address, setAddress] = useState('')
    const [makeOrder, {isLoading, error, data}] = useMakeOrderMutation()
    const {user} = useAppSelector(state => state.user)
    const navigate = useNavigate()
    const [getCart] = useLazyGetCartByIdQuery()
    const [cart, setCart] = useState() as [Cart, Function]
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [getUser] = useLazyGetOneQuery()
    const {setUserState} = useActions()
    useEffect(() => {
        if (!localStorage.getItem(JWT_KEY)) {
            navigate('/auth')
        }
    }, [])

    useEffect(() => {
        if (user.id) {
            getCart(user.activeCart.id).then(res => res.data && setCart(res.data))
        }
    }, [user])

    const send = () => {

        makeOrder({
            cartId: user.activeCart.id,
            userId: user.id,
            description,
            address,
            finalPrice: cart.productsInCart.reduce((acc, item) => acc + item.quantity * item.price, 0)
        }).then(res => {
            // @ts-ignore
            if (res.data) {
                setIsModalOpen(true)
                const {id} = decodeToken(localStorage.getItem(JWT_KEY) || '') as { id: number }
                id && getUser(id).then(res => res.data && setUserState(res.data))
            }
        })
    }

    const closeModal = () => {
        setIsModalOpen(false)
        navigate('/')
    }

    return (
        <div>
            <h1 className={["page-title", styles.title].join(' ')}>
                Оформление заказа
            </h1>
            <ErrorPost> Доставка возможна только по Иркустку</ErrorPost>
            <Section>
                <TextNumberInput rows={2} required={false} label={"Ваши пожелания к заказу"} type={"textarea"}
                                 value={description}
                                 onChange={value => setDescription(String(value))}></TextNumberInput>
            </Section>
            <Section>
                <TextNumberInput rows={1} required={false} label={"Адрес доставки"} type={"textarea"} value={address}
                                 onChange={value => setAddress(String(value))}></TextNumberInput>
            </Section>
            <Section>
                <ButtonPrime isLoading={isLoading} className={!cart || isLoading ? "disabled" : ''}
                             onClick={() => send()}> Отправить</ButtonPrime>
                {error && <ErrorPost>
                    Не удалось отправить заказ, ошибка на стороне сервера.
                </ErrorPost>}
            </Section>

            <Modal isModalOpen={isModalOpen} setIsModalOpen={value =>closeModal()}>
                <div className={styles.modal}>
                    <p className={styles.modal__text}>
                        Заказ успешно отправлен. В&nbsp;скором
                        времени мы свяжемся с вами.
                    </p>
                    <ButtonSecondary className={styles.modal__button} onClick={() => closeModal()}> Хорошо</ButtonSecondary>
                </div>

            </Modal>
        </div>
    );
};

export default Order;