import React, {useEffect} from 'react';
import Name from "../../../components/product/Name";
import Descriptions from "../../../components/product/descriptions/Descriptions";
import Pictures from "../../../components/product/pictures/Pictures";
import NamePriceList from "../../../components/product/name-price/NamePriceList";
import {nameOnlyArr, namePriceArr} from "../../../config";
import NameOnlyList from "../../../components/product/name-only/NameOnlyList";
import Decorations from "../../../components/product/decorations/Decorations";
import Properties from "../../../components/product/properties/Properties";
import Price from "../../../components/product/Price";
import styles from './ProductForm.module.scss';
import Section from "../../../components/UI/section/Section";
import {useAppSelector} from "../../../hooks/redux";
import ButtonPrime from '../../../components/UI/buttons/button-prime/ButtonPrime';
import ErrorPost from "../../../components/UI/error-post/ErrorPost";
import {arrTypes} from "../../../types";
import Loader from "../../UI/loader/Loader";
import {useLazyGetPropQuery} from "../../../store/props/props.api";
import {initialState} from "../../../store/props/props.slice";
import {useActions} from "../../../hooks/actions";
import {initialProductState} from "../../../store/product/product.slice";
import {useLazyCleanFileStoreQuery} from "../../../store/product/product.api";
import {useNavigate} from "react-router-dom";
import {useRedirect} from "../../../hooks/useRedirect";

interface Props {
    title: string;
    onSubmit: Function;
    isLoading: boolean;
    type: arrTypes.CONSTRUCTOR | arrTypes.PRODUCT | arrTypes.CANDY
}

const ProductForm = (props: Props) => {

    const {errors} = useAppSelector(state => state.ui)
    const [getProp] = useLazyGetPropQuery()
    const {setProductState, nullifyPropsState} = useActions()
    const {isAdmin, isAdminChecked} = useAppSelector(state => state.auth)
    const {user} = useAppSelector(state => state.user)
    const redirect = useRedirect()
    useEffect(() => {
        Object.keys(initialState).forEach(key => getProp(key))
        return () => {
            setProductState(initialProductState)
            nullifyPropsState()
        }
    }, [])

    useEffect(() => {
        if (isAdmin !== null) {
            !isAdmin && redirect()
        }
    }, [isAdmin])

    const isProduct = props.type === arrTypes.PRODUCT
    const isConstructor = props.type === arrTypes.CONSTRUCTOR
    const isCandy = props.type === arrTypes.CANDY

    return (
        <div className={styles.body}>
            <h2 className={styles.title}> {props.title} </h2>
            {!isConstructor && <Section>
                {!isConstructor && <Name/>}
                {isCandy && <Price></Price>}
            </Section>}
            {!isConstructor && <Pictures></Pictures>}
            {isConstructor && <Decorations></Decorations>}
            {isCandy && <Properties></Properties>}

            {!isCandy && <>
                {nameOnlyArr.map(item => (isProduct || item.type === arrTypes.CAKE) &&
                    <NameOnlyList key={item.type} {...item}></NameOnlyList>)}
                {namePriceArr.map(item => <NamePriceList key={item.type} {...item}></NamePriceList>)}
            </>}
            {/*{!isConstructor && <Descriptions></Descriptions>}*/}
            <ButtonPrime onClick={() => props.onSubmit()} disabled={!!errors.length}
                         className={[styles.submit, !isAdmin && 'disabled'].join('')}>Сохранить</ButtonPrime>
            {props.isLoading && <Loader className={styles.loader}></Loader>}
            {!!errors.length && <ErrorPost> Невозможно сохранить изменения, пока все необходимые поля не заполнены
                корректно. </ErrorPost>}
        </div>
    )
};

export default ProductForm;