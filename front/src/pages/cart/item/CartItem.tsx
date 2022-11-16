import React, {useEffect, useState} from 'react';
import {ProductInCartFromRepository} from "../../../types";
import {BASE_URL_API} from "../../../config";
import Counter from "../../../components/product/counter/Counter";
import ButtonSecondary from "../../../components/UI/buttons/button-secondary/ButtonSecondary";
import {useChangeCartItemNumberMutation, useDeleteCartItemMutation} from "../../../store/cart/cart.api";
import styles from './CartItem.module.scss';

interface Props {
    item: ProductInCartFromRepository,
    setProducts: (arg: ProductInCartFromRepository[]) => void,
    items: ProductInCartFromRepository[],
    onDelete: () => void,
}

const CartItem = ({item, setProducts, items, onDelete}: Props) => {

    const [img, setImg] = useState('')
    const [quantity, setQuantity] = useState(0)
    const [changeCartItemQuantity] = useChangeCartItemNumberMutation()
    const getImageUrl = (item: ProductInCartFromRepository) => {
        if (item.product.pictures && item.product.pictures.length) {
            const picture = item.product.pictures.find(item => item.main) || item.product.pictures[0]
            return BASE_URL_API + '/' + picture.value
        } else {
            return ""
        }

    }

    useEffect(() => {
        if (item) {
            setImg(getImageUrl(item))
            setQuantity(item.quantity)
        }
    }, [item])


    const changeQuantity = (value: number) => {
        if (!!value) {
            setQuantity(value)
            item.id && changeCartItemQuantity({
                id: item.id,
                quantity: value
            })
        }
    }

    useEffect(() => {

        if (quantity) {
            const products = JSON.parse(JSON.stringify(items)) as ProductInCartFromRepository[]
            const currentItem = products.find(product => product.id === item.id)
            if (currentItem) {
                currentItem.quantity = quantity
                setProducts(products)
            }
        }


    }, [quantity])

    return (
        <li className={styles.item}>
            <div className={styles.item__body}>
                <img className={styles.image} src={img || '/images/constructor.jpg'} alt=""/>
                <div className={styles.content}>
                    <div className={styles.content__right}>
                        <h3 className={styles.name}>{item.product.name}</h3>
                        <p className={styles.price}>{item.price * quantity} р.</p>
                        <Counter className={styles.counter} value={quantity}
                                 onChange={value => changeQuantity(value)}></Counter>
                    </div>
                    {item.cake && <div className={styles.content__block}>
                        <div className={styles.line}>
                            <p className={styles.title}>Корж:</p>
                            <p className={styles.value}>{item.cake.name}</p>
                        </div>
                        <div className={styles.line}>
                            <p className={styles.title}>Крем:</p>
                            <p className={styles.value}>{item.cream.name}</p>
                        </div>
                        <div className={styles.line}>
                            <p className={styles.title}>Размер:</p>
                            <p className={styles.value}>{item.size.name}</p>
                        </div>
                    </div>}
                    {!!item.decorations?.length && <div className={styles.content__block}>
                        <h3 className={styles.title}>Украшения:</h3>

                        {item.decorations.map(decor =>
                            <p key={decor.id} className={styles.value }>
                                {decor.name}
                            </p>
                        )}

                    </div>}
                    {!!item.nuances?.length && <div className={styles.content__block}>
                        <h3 className={styles.title}>Нюансы:</h3>
                            {item.nuances.map(nuance =>
                                <p key={nuance.id} className={styles.value }>
                                    {nuance.name}
                                </p>
                            )}
                    </div>}
                    {!!item.product.properties?.length && <div className={styles.content__block}>
                        {item.product.properties.map(prop =>
                            <div key={prop.id} className={styles.line}>
                                <p className={styles.title}>{prop.name}:</p>
                                <p className={styles.value}>{prop.value}</p>
                            </div>
                        )}
                    </div>}

                </div>
            </div>

            <div className={styles.item__bottom}>
                <ButtonSecondary onClick={() => onDelete()} type={"delete"}>Удалить</ButtonSecondary>

            </div>
        </li>
    );
};

export default CartItem;