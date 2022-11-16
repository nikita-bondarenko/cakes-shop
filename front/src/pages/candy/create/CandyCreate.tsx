import React, {useEffect} from 'react';
import ProductForm from "../../../components/product/form/ProductForm";
import {arrTypes} from "../../../types";
import {useCreateProductMutation, useUpdateProductMutation} from "../../../store/product/product.api";
import {useAppSelector} from "../../../hooks/redux";
import {prepareProduct} from "../../../hooks/usePrepareProduct";
import {useNavigate} from "react-router-dom";
import {useActions} from "../../../hooks/actions";
import {useRedirect} from "../../../hooks/useRedirect";
import {init} from "../../../store/product/product.init";

const CandyCreate = () => {

    const [createProduct, {isLoading}] = useCreateProductMutation()
    const type = arrTypes.CANDY
    const product = useAppSelector(state => state.product)
    const {add} = useActions()
    const navigate = useNavigate()

    const onSubmitHandler = () => {
        const body = prepareProduct(JSON.parse(JSON.stringify(product)))
        body.typeId = 3
        createProduct(body).then(() => navigate('/candies'))

    }
    useEffect(() => {
        [arrTypes.PIC].forEach(type => {
            // @ts-ignore
            !product[type].length && add({type, body: init[type]()})
        })
    })
    return (
        <ProductForm isLoading={isLoading} type={type} title="Создание сладкого продукта" onSubmit={() => {
            onSubmitHandler()
        }}/>
    );
};

export default CandyCreate;