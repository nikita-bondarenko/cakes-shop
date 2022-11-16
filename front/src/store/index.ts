import {configureStore} from '@reduxjs/toolkit'
import {setupListeners} from '@reduxjs/toolkit/query'
import {productReducer} from "./product/product.slice";
import {fileApi} from "./file/file.api";
import {productApi} from "./product/product.api";
import {uiReducer} from "./ui/ui.slice";
import {propsReducer} from "./props/props.slice";
import {propsApi} from "./props/props.api";
import {userApi} from "./user/user.api";
import {userReducer} from "./user/user.slice";
import {authApi} from "./auth/auth.api";
import {commentApi} from "./comment/comment.api";
import {authReducer} from "./auth/auth.slice";
import {cartApi} from "./cart/cart.api";

export const store = configureStore({
    reducer: {
        [cartApi.reducerPath]: cartApi.reducer,
        [fileApi.reducerPath]:fileApi.reducer,
        [productApi.reducerPath]:productApi.reducer,
        [propsApi.reducerPath]:propsApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [commentApi.reducerPath]: commentApi.reducer,
        auth: authReducer,
        props: propsReducer,
        product: productReducer,
        ui: uiReducer,
        user: userReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(cartApi.middleware).concat(commentApi.middleware).concat(fileApi.middleware).concat(productApi.middleware).concat(propsApi.middleware).concat(userApi.middleware).concat(authApi.middleware)
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>