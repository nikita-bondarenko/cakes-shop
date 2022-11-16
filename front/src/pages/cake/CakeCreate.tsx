import React, {useEffect} from 'react';
import {useCreateProductMutation} from "../../store/product/product.api";
import {useAppSelector} from "../../hooks/redux";
import {prepareProduct} from "../../hooks/usePrepareProduct";
import {arrTypes} from "../../types";
import ProductForm from "../../components/product/form/ProductForm";
import {useRedirect} from "../../hooks/useRedirect";
import {init} from "../../store/product/product.init";
import {useActions} from "../../hooks/actions";
import {useNavigate} from "react-router-dom";


const CakeCreate = () => {

    const [createProduct, {isLoading}] = useCreateProductMutation()
    const {add} = useActions()
    const type = arrTypes.PRODUCT
    const product = useAppSelector(state => state.product)
    const navigate = useNavigate()
    const onSubmitHandler = () => {
        const body = prepareProduct(JSON.parse(JSON.stringify(product)))
        body.typeId = 1
        createProduct(body).then(() => navigate('/cakes'))
    }

    useEffect(() => {
        [arrTypes.CAT, arrTypes.CAKE, arrTypes.PIC, arrTypes.CREAM, arrTypes.SIZE, arrTypes.NUANCE].forEach(type => {
            // @ts-ignore
            !product[type].length && add({type, body: init[type]()})
        })
    }, [])

    return (
        <ProductForm isLoading={isLoading} type={type} title="Создание торта" onSubmit={() => {
            onSubmitHandler()
        }}/>
    );
};

export default CakeCreate;