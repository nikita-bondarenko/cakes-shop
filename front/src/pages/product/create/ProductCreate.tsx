import React, {useEffect} from 'react';
import ProductForm from "../../../components/product/form/ProductForm";
import {arrTypes} from "../../../types";
import {useCreateProductMutation} from "../../../store/product/product.api";
import {useAppSelector} from "../../../hooks/redux";
import {prepareProduct} from "../../../hooks/usePrepareProduct";
import {useNavigate} from "react-router-dom";
import {useActions} from "../../../hooks/actions";
import {init} from "../../../store/product/product.init";

interface ProductProps {
    typeId: number,
    type: arrTypes.CONSTRUCTOR | arrTypes.PRODUCT | arrTypes.CANDY,
    title: string
}

const ProductCreate = ({typeId, type, title}: ProductProps) => {

    const [createProduct, {isLoading}] = useCreateProductMutation()

    const product = useAppSelector(state => state.product)

    const {add} = useActions()

    const navigate = useNavigate()

    const onSubmitHandler = () => {
        const body = prepareProduct(JSON.parse(JSON.stringify(product)))
        body.typeId = typeId
        createProduct(body).then(() => navigate(typeId === 1 ? '/cakes' : typeId === 2 ? "/constructor" : "/candies"))
    }

    useEffect(() => {
        if (typeId === 1) {
            [arrTypes.CAT, arrTypes.CAKE, arrTypes.PIC, arrTypes.CREAM, arrTypes.SIZE, arrTypes.DECOR, arrTypes.NUANCE].forEach(type => {
                // @ts-ignore
                !product[type].length && add({type, body: init[type]()})
            })
        } else if (typeId === 3) {
            [arrTypes.PIC].forEach(type => {
                // @ts-ignore
                !product[type].length && add({type, body: init[type]()})
            })
        }
    }, [])

    return (
        <ProductForm isLoading={isLoading} type={type} title={title} onSubmit={() => {
            onSubmitHandler()
        }}/>
    );
};

export default ProductCreate;