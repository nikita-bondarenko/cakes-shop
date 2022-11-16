import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BASE_URL_API} from "../../config";
import {ProductState} from "./product.slice";
import {Decor, Picture, Product} from "../../types";

interface GetProductsArg {
    typeId: number,
    name?: string,
    offset?: number,
    limit?: number,
    categoryId?: number,
    minPrice?: number,
    maxPrice?: number,
}

export const productApi = createApi({
    reducerPath: 'product/api',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL_API + '/products'
    }),
    endpoints: build => ({

        getProducts: build.query<{items: Product[], pagination: {count: number}}, GetProductsArg>({
            query: (arg: GetProductsArg) => ({
                url: '',
                params: arg
            })
        }),
        isNameUnique: build.mutation<boolean, { name: string, id: string | undefined }>({
            query: ({name, id}) =>
                ({
                    url: `/unique/${name}/${id}`,
                    method: "GET"
                })
        }),
        getProductById: build.query<ProductState, number>({
            query: (id) => ({
                url: `/${id}`,
                method: "GET"
            })
        })
        ,
        createProduct: build.mutation<Object, ProductState>({
            query: (body) =>
                ({
                    url: ``,
                    method: "POST",
                    body
                })
        }),
        updateProduct: build.mutation<Object, { body: ProductState, id: number }>({
            query: ({body, id}) =>
                ({
                    url: `/${id}`,
                    method: "PUT",
                    body
                })
        }),
        deleteProduct: build.query<void, number>({
            query: (id) =>
                ({
                    url: `/${id}`,
                    method: "DELETE"
                })
        }),
        cleanFileStore: build.query<void, {id: number, pictures: Picture[], decorations: Decor[]}>({
            query: (body) =>
                ({
                    url: `/files/${body.id}`,
                    method: "DELETE",
                    params: {
                        pictures: body.pictures,
                        decorations: body.decorations
                    }
                })
        })
    })
})

export const {
    useLazyGetProductsQuery,
    useIsNameUniqueMutation,
    useCreateProductMutation,
    useLazyDeleteProductQuery,
    useLazyGetProductByIdQuery,
    useUpdateProductMutation,
    useLazyCleanFileStoreQuery
} = productApi