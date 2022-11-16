import React, {useEffect} from 'react';
import ProductForm from "../../../components/product/form/ProductForm";
import {arrTypes} from "../../../types";
import {useLazyGetProductByIdQuery, useUpdateProductMutation} from "../../../store/product/product.api";
import {useAppSelector} from "../../../hooks/redux";
import {prepareProduct} from "../../../hooks/usePrepareProduct";
import {useNavigate, useParams} from "react-router-dom";
import Loader from "../../../components/UI/loader/Loader";
import {useActions} from "../../../hooks/actions";
import {useRedirect} from "../../../hooks/useRedirect";

const CandyUpdate = () => {
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
        data &&  setProductState(data)
        if (data && data.typeId !== 3)  navigate('/not_found')

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
            <ProductForm isLoading={isLoading} type={arrTypes.CANDY} title={`Редактирование сладости "${product.name}"`}
                         onSubmit={() => {
                             onSubmitHandler()
                         }}/>
    )
        ;
};

export default CandyUpdate;