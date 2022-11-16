import {useAppSelector} from "./redux";

export const useProductSelector = (type: string) => {
    const product = useAppSelector(state => state.product)
    // @ts-ignore
    return product[type]
}