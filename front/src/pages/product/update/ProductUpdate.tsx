import React, {useEffect} from 'react';
import ProductForm from "../../../components/product/form/ProductForm";
import {arrTypes} from "../../../types";
import {useLazyGetProductByIdQuery, useUpdateProductMutation} from "../../../store/product/product.api";
import {useAppSelector} from "../../../hooks/redux";
import {useNavigate, useParams} from "react-router-dom";
import Loader from "../../../components/UI/loader/Loader";
import {useActions} from "../../../hooks/actions";
import {prepareProduct} from "../../../hooks/usePrepareProduct";


interface Props {
    typeId: number,
    type: arrTypes.CONSTRUCTOR | arrTypes.PRODUCT | arrTypes.CANDY,
    title: string
}

const ProductUpdate = ({type, title, typeId}: Props) => {

    const {id} = useParams()
    const {setProductState, setRedirectedFrom} = useActions()
    const {redirectedFrom} = useAppSelector(state => state.auth)
    const [getProduct, {isLoading: isStateLoading, data}] = useLazyGetProductByIdQuery()

    const navigate = useNavigate()

    useEffect(() => {
        data === null && navigate(`/not_found`)
        if (data) {
            console.log(data)
            data.typeId !== typeId ? navigate(`/not_found`) : setProductState(data)
        }
    }, [data])
    const [updateProduct, {isLoading}] = useUpdateProductMutation()
    const product = useAppSelector(state => state.product)
    const onSubmitHandler = () => {
        const body = prepareProduct(JSON.parse(JSON.stringify(product)))
        updateProduct({body, id: Number(id)}).then(() => navigate(!!redirectedFrom ? redirectedFrom : '/'))
        setRedirectedFrom('')
    }

    useEffect(() => {
        // @ts-ignore
        getProduct(id)
    }, [])

    return (
        isStateLoading
            ? <Loader isBig={true}></Loader>
            :
            <ProductForm isLoading={isLoading} type={type}
                         title={[title, data && type !== arrTypes.CONSTRUCTOR ? `"${data.name}"` : ''].join(' ')}
                         onSubmit={() => {
                             onSubmitHandler()
                         }}/>
    )
        ;
};

export default ProductUpdate;