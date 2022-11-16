import {ProductState} from "../store/product/product.slice";


export const prepareProduct = (body: ProductState) => {

    Object.entries(body).forEach(([key,value]) => {

        // @ts-ignore
        if (typeof body[key] === "object") {
            // @ts-ignore
            !!body[key].length && body[key].map((item: { id: any; }) => {
                delete item.id
                return item
            })
        }
    })
    // @ts-ignore
    delete body.createdAt
    // @ts-ignore
    delete body.updatedAt
    // @ts-ignore
    delete body.type
    // @ts-ignore
    delete body.productsInCart
    return body
}