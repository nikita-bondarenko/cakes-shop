import {createSlice} from "@reduxjs/toolkit";
import {
    Cake,
    Cream,
    CreateCategoryDto,
    CreateDescriptionDto,
    Decor,
    Nuance,
    Picture,
    Property,
    Size
} from "../../types";

interface PropsState {
    categories: CreateCategoryDto[],
    cakes: Cake[],
    creams: Cream[],
    sizes: Size[],
    nuances: Nuance[],
    decorations: Decor[],
    properties: Property[],
}

export const initialState: PropsState = {
    categories: [],
    cakes: [],
    creams: [],
    sizes: [],
    nuances: [],
    decorations: [],
    properties: [],
}

interface Action {
    payload: {
        type: string,
        value: any[]
    }
}

export const propsSlice = createSlice({
    name: 'props',
    initialState,
    reducers: {
        setProps(state, {payload} : Action) {
            // @ts-ignore
            state[payload.type] = payload.value
        },
        nullifyPropsState(state) {
            Object.entries(state).forEach(([key,value]) => {
                // @ts-ignore
                state[key] = null
            })
        }
    }
})

export const propsReducer = propsSlice.reducer
export const propsActions = propsSlice.actions