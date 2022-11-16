import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    Cake, Comment,
    Cream,
    CreateCategoryDto,
    CreateDescriptionDto,
    Decor,
    Nuance,
    Payload,
    Picture,
    Property, SetPayload,
    Size
} from "../../types";
import {init} from "./product.init";

export interface ProductState {
    id: number;
    name: string;
    price: number;
    categories: CreateCategoryDto[],
    descriptions: CreateDescriptionDto[]
    pictures: Picture[],
    cakes: Cake[],
    creams: Cream[],
    sizes: Size[],
    nuances: Nuance[],
    decorations: Decor[],
    properties: Property[],
    comments: Comment[],
    recommendations: number[],
    mainPicture: string,
    typeId: number | undefined
}

export const initialProductState: ProductState = {
    id: 0,
    name: '',
    price: 0,
    categories: [],
    descriptions: [],
    pictures: [],
    cakes: [],
    creams: [],
    sizes: [],
    nuances: [],
    decorations: [],
    properties: [],
    recommendations: [],
    mainPicture: '',
    typeId: 0,
    comments: [],
}


export const productSLice = createSlice({
    name: 'product',
    initialState: initialProductState,
    reducers: {
        add(state, action: PayloadAction<Payload>) {
            // @ts-ignore
            state[action.payload.type].push(init[action.payload.type]())
        },
        remove(state, action: PayloadAction<Payload>) {
            // @ts-ignore
            state[action.payload.type] = state[action.payload.type].filter(item => item.id !== action.payload.body.id)
        },
        update(state, action: PayloadAction<Payload>) {
            // @ts-ignore
            const item = state[action.payload.type].find(item => item.id === action.payload.body.id)
            if (item) {
                // @ts-ignore
                Object.entries(action.payload.body).forEach(([key, value]) => {
                    item[key] = value
                })
            }
        },
        set(state, action: PayloadAction<SetPayload>) {
            // @ts-ignore
            state[action.payload.type] = action.payload.value
        },
        setProductState(state, action) {
            Object.entries(action.payload).forEach(([key,value]) => {
                // @ts-ignore
                state[key] = value
            })

        }

    }
})

export const productReducer = productSLice.reducer
export const productActions = productSLice.actions