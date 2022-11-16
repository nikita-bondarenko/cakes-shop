import {createSlice} from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {redirectedFrom: '', isAdmin: null, isAdminChecked: false},
    reducers: {
        setRedirectedFrom(state, {payload}: { payload: string }) {
            state.redirectedFrom = payload
        },
        setIsAdmin(state, {payload}: { payload: boolean }) {
            // @ts-ignore
            state.isAdmin = payload
        }
    }
})

export const authActions = authSlice.actions
export const authReducer = authSlice.reducer