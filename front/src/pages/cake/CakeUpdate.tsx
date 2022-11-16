import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {arrTypes} from "../../types";
import {useLazyGetProductByIdQuery, useUpdateProductMutation} from "../../store/product/product.api";
import {prepareProduct} from "../../hooks/usePrepareProduct";
import {useActions} from "../../hooks/actions";
import {useRedirect} from "../../hooks/useRedirect";
import Loader from "../../components/UI/loader/Loader";
import ProductForm from "../../components/product/form/ProductForm";
import {useAppSelector} from "../../hooks/redux";


const CakeUpdate = () => {
    const {id} = useParams()
    const {setProductState} = useActions()
    const [getProduct, {isLoading: isStateLoading, data}] = useLazyGetProductByIdQuery()
    const redirect = useRedirect()
const navigate = useNavigate()
    useEffect(() => {
        // @ts-ignore
        getProduct(id)
    }, [])
    useEffect(() => {
        data && setProductState(data)
        if (data && data.typeId !== 1)  navigate('/not_found')
    }, [data])
    const [updateProduct, {isLoading}] = useUpdateProductMutation()
    const product = useAppSelector(state => state.product)
    const onSubmitHandler = () => {
        const body = prepareProduct(JSON.parse(JSON.stringify(product)))
        updateProduct({body, id: Number(id)}).then(() => redirect())

    }

    return (
        isStateLoading
            ? <Loader isBig={true}></Loader>
            :
            <ProductForm isLoading={isLoading} type={arrTypes.PRODUCT} title={`Редактирование торта "${product.name}"`}
                         onSubmit={() => {
                             onSubmitHandler()
                         }}/>
    )
        ;
};

export default CakeUpdate;