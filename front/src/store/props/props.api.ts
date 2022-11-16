import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {BASE_URL_API} from "../../config";
import {propsActions} from "./props.slice"

const {setProps} = propsActions

export const propsApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL_API + '',
    }),
    endpoints: (build) => ({
        getProp: build.query<any[], string>({
            query: (prop) => `/${prop}`,
            async onQueryStarted(prop, {dispatch, queryFulfilled}) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setProps({type: prop, value: data}))
                } catch (err) {
                    console.log(err)
                }
            },
        }),
    }),
})

export const {useLazyGetPropQuery} = propsApi