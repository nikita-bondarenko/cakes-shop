import React, {useEffect, useState} from 'react';
import {Cake, Cream, Decor, Nuance, Product, ProductInCart, Size} from "../../../types";
import {useAppSelector} from "../../../hooks/redux";
import ItemPropInput from "../../UI/inputs/item-prop-input/ItemPropInput";
import styles from './ProductItemForm.module.scss'
import Counter from "../counter/Counter";
import ButtonPrime from "../../UI/buttons/button-prime/ButtonPrime";
import DirectModal from "../../UI/modals/direct/DirectModal";
import properties from "../properties/Properties";
import {useParams} from "react-router-dom";
import {useAddToCartMutation} from "../../../store/cart/cart.api";
import SuccessModal from "../../UI/modals/success/SuccessModal";

const ProductItemForm = () => {

    const {user} = useAppSelector(state => state.user)
    const {cakes, creams, decorations, sizes, nuances, price, properties} = useAppSelector(state => state.product)
    const [cake, setCake] = useState() as [Cake, Function]
    const [cream, setCream] = useState() as [Cream, Function]
    const [size, setSize] = useState() as [Size, Function]
    const [nuanceItems, setNuanceItems] = useState([]) as [Nuance[], Function]
    const [decorationItems, setDecorationItems] = useState([]) as [Decor[], Function]
    const [quantity, setQuantity] = useState(1)
    const [itemPrice, setItemPrice] = useState(0)
    const [productInCart, setProductInCart] = useState() as [ProductInCart, Function]
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)

    const {id} = useParams()
    const pageType = window.location.pathname.split("/")[1]


    useEffect(() => {
        user.id && setProductInCart({

            ...productInCart,
            ...(cake ? {cakeId: cake.id} : {}),
            ...(cream ? {creamId: cream.id} : {}),
            ...(size ? {sizeId: size.id} : {}),
            ...(decorationItems.length ? {decorations: decorationItems.map(item => item.id)} : {decorations: []}),
            ...(nuanceItems.length ? {nuances: nuanceItems.map(item => item.id)} : {nuances: []}),
            ...(user.activeCart ? {cartId: user.activeCart.id} : {}),
            quantity,
            price: itemPrice ,
            productId: Number(id),
        })

        const priceArr: number[] = [price, cake && cake.price, cream && cream.price, size && size.price, ...nuanceItems.map(item => item.price), ...decorationItems.map(item => item.price)]
        const sum = priceArr.reduce((acc, item) => item ? acc + item : acc, 0)
        setItemPrice(sum )
    }, [price, cake,
        cream,
        size,
        nuanceItems,
        decorationItems,
        quantity,
        itemPrice])

    const [addToCart, {isLoading}] = useAddToCartMutation()

    const putToCart = () => {
        if (user.id) {
            addToCart(productInCart).then((res: any) => res.data && setIsSuccessModalOpen(true))
        } else {
            setIsModalOpen(true)
        }
    }


    return (
        <div className={[styles.form, pageType === 'constructor' && styles.constructor].join(' ')}>
            {!!cakes.length &&
                <ItemPropInput className={styles.form__item} title={"Корж"} onChangeValue={item => setCake(item)}
                               items={cakes}
                               type={"name"}></ItemPropInput>}
            {!!creams.length &&
                <ItemPropInput className={styles.form__item} title={"Крем"} onChangeValue={item => setCream(item)}
                               items={creams}
                               type={"name-price"}></ItemPropInput>}
            {!!sizes.length &&
                <ItemPropInput className={styles.form__item} title={"Размер"} onChangeValue={item => setSize(item)}
                               items={sizes}
                               type={"name-price"}></ItemPropInput>}

            {!!decorations.length &&
                <ItemPropInput className={[styles.form__item, styles.constructor__block].join(' ')} title={"Украшение"}
                               onChangeValueArray={items => setDecorationItems(items)} items={decorations}
                               type={"decor"}></ItemPropInput>}
            {!!nuances.length &&
                <ItemPropInput className={styles.form__item} title={"Специальный вариант"}
                               onChangeValueArray={items => setNuanceItems(items)}
                               items={nuances} type={"nuance"}></ItemPropInput>}
            {!!properties.length &&
                <ul className={styles.properties}>
                    {properties.map(item =>
                        <li className={styles.properties__item} key={item.id}>
                            <p className={styles.properties__name}>{item.name}:</p>
                            <p className={styles.properties__value}>{item.value}</p>
                        </li>
                    )}
                </ul>
            }
            <div className={[styles.price, styles.constructor__block].join(' ')}>
                <p className={styles.price__title}>Цена:</p>
                <p className={styles.price__value}>{itemPrice * quantity} р.</p>
            </div>
            <div className={styles.constructor__bottom}>

                <div className={[styles.submit_group].join(' ')}>
                    <ButtonPrime className={styles.submit_group__button} isLoading={isLoading} onClick={() => putToCart()}>Положить в&nbsp;корзину</ButtonPrime>
                    <Counter className={styles.submit_group__counter} value={quantity}
                             onChange={value => value >= 1 && setQuantity(value)}></Counter>
                </div>
            </div>
            <SuccessModal isModalOpen={isSuccessModalOpen}
                          setIsModalOpen={value => setIsSuccessModalOpen(value)}></SuccessModal>
            <DirectModal isModalOpen={isModalOpen} setIsModalOpen={(value) => setIsModalOpen(value)}></DirectModal>
        </div>
    );
};

export default ProductItemForm;