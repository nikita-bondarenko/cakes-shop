import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {BASE_URL_API} from "../../config";
import {Cart, Order, ProductInCart, ProductInCartFromRepository} from "../../types";


export const cartApi = createApi({
    reducerPath: 'cart/api',

    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL_API + '',
    }),
    endpoints: (build) => ({
        addToCart: build.mutation<ProductInCartFromRepository, ProductInCart>({
            query: (body) => ({
                url: `/products_in_cart`,
                method: "POST",
                body
            }),
        }),
        changeCartItemNumber: build.mutation<any, { id: number, quantity: number }>({
            query: (body) => ({
                url: `/products_in_cart`,
                method: "PUT",
                body
            }),
        }),
        deleteCartItem: build.mutation<any, number>({
            query: (id) => ({
                url: `/products_in_cart/${id}`,
                method: "DELETE"
            }),
        }),
        getCartById: build.query<Cart, number>({
            query: (id) => ({
                url: `/carts/${id}`
            }),
        }),
        makeOrder: build.mutation<Order, Order>({
            query: (body) => ({
                url: `/orders`,
                method: "POST",
                body
            }),
        }),
    }),
})

export const {useAddToCartMutation, useChangeCartItemNumberMutation, useDeleteCartItemMutation, useLazyGetCartByIdQuery, useMakeOrderMutation} = cartApi