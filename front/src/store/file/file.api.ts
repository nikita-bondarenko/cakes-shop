import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BASE_URL_API} from "../../config";

export const fileApi = createApi({
    reducerPath: 'file/api',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL_API + '/files'
    }),
    endpoints: build => ({
        upload: build.mutation<string, FormData>({
            query: (body) =>
                ({
                    url: ``,
                    method: 'POST',
                    body,
                    responseHandler: (response) => response.text()
                })
        }),
        deleteFile: build.mutation<void, string>({
            query: (picture) =>
                ({
                    url: `/${picture}`,
                    method: 'DELETE'
                })
        })
    })
})

export const {useUploadMutation, useDeleteFileMutation} = fileApi