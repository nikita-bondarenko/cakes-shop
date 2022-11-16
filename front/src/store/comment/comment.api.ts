import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BASE_URL_API} from "../../config";

export const commentApi = createApi({
    reducerPath: 'comment/api',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL_API + ""
    }),
    endpoints: build => ({

        getComments: build.query<{ items: Comment[], pagination: { count: number } }, { id?: number , body: { offset: number, limit: number } }>({
            query: ({id, body}) =>
                ({
                    url: typeof id === "number" ? `/comments/${id}` : '/global_comments',
                    params: body
                })
        }),

        createComment: build.query<Comment[], Comment>({
            query: (body) =>
                ({
                    url: ``,
                    method: 'POST',
                    body,
                })
        }),
        deleteComment: build.query<void, number>({
            query: (id) =>
                ({
                    url: `/${id}`,
                    method: 'DELETE'
                })
        }),
        updateComment: build.query<void, { id: number, body: Comment }>({
            query: ({id, body}) => ({
                url: `/${id}`,
                method: "PUT",
                body
            })
        })
    })
})

export const {
    useLazyCreateCommentQuery,
    useLazyDeleteCommentQuery,
    useLazyUpdateCommentQuery,
    useLazyGetCommentsQuery
} = commentApi