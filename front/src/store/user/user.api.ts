import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {BASE_URL_API} from "../../config";
import {User} from "../../types";

export const userApi = createApi({
    reducerPath: 'user/api',

    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL_API + '/users',
    }),
    endpoints: (build) => ({
        isEmailUnique: build.query<boolean, { email: string, id: number | undefined }>({
            query: ({email, id}) => `/unique/${email}/${id}`
        }),
        update: build.mutation<any, { id: number, body: any }>({
            query: ({id, body}) => ({
                url: `/${id}`,
                method: "PUT",
                body
            })
        }),
        getOne: build.query<User, number>({
            query: (id) => `/${id}`,
        }),
    }),
})

export const {useLazyIsEmailUniqueQuery, useUpdateMutation, useLazyGetOneQuery} = userApi