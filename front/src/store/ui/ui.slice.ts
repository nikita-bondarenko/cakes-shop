import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const red = '220, 90, 90'
const blue = '52, 152, 219'
const pink = '240, 128, 128'
const gray = '97, 106, 107'

export const colors = {
    red,
    blue,
    pink,
    gray
}

interface Error {
    id: number
}

interface UiState {
    isModalOpen: boolean;
    mainColor: string;
    cursorColor: string;
    deletingProductId: number | null;
    gray: string;
    red: string,
    blue: string,
    pink: string,
    errors: Error[],
    isMobile: boolean
}

const initialState: UiState = {
 isModalOpen: false,
    mainColor: colors.pink,
    cursorColor: colors.red,
    deletingProductId: null,
    gray,
    red,
    blue,
    pink,
    errors: [],
    isMobile:false
}

interface PayloadSet {
    type:  "mainColor" | "cursorColor" | "errors" | 'deletingProductId' | "isModalOpen" | "isMobile"
    value: boolean | string | number[]
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setUi(state, action: PayloadAction<PayloadSet>) {
            // @ts-ignore
            state[action.payload.type] = action.payload.value
        },
        addError(state, action) {
            state.errors.push({id: action.payload})
        },
        deleteError(state, action) {
            state.errors = state.errors.filter(error => error.id !== action.payload)
        }
    }
})

export const uiActions = uiSlice.actions
export const uiReducer = uiSlice.reducer