import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {BASE_URL_API} from "../../config";


export const authApi = createApi({
    reducerPath: 'auth/api',

    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL_API + '/auth',
    }),
    endpoints: (build) => ({
        confirmEmail: build.mutation<any, { email: string, token: string }>({
            query: (body) => ({
                url: `/confirm`,
                method: "POST",
                body
            }) ,

        }),
        createUser: build.mutation<{token: string}, { email: string, password: string }>({
            query: (body) => ({
                url: '/registration',
                method: "POST",
                body
            })
        }),
        login: build.mutation<{token: string}, { email: string, password: string }> ( {
            query: (body) => ({
                url: '/login',
                method: "POST",
                body
            })
        }),
        loginByEmail: build.mutation<{token: string}, { email: string }>({
            query: ({email}) => ({
                url: `/email/${email}`,
                method: "POST"
            })
        })
    }),
})

export const {useConfirmEmailMutation, useCreateUserMutation, useLoginMutation, useLoginByEmailMutation} = authApi