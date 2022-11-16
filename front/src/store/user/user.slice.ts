import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface UserState {
    user: any;
}

const initialState: UserState = {
    user: {}
}

interface Payload {
    type: string,
    value: string | number
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserState(state, action: PayloadAction<any>) {
            state.user = action.payload
        },
        setUserProp(state, action: PayloadAction< Payload>) {
            if(state.user[action.payload.type] ) {
                state.user[action.payload.type] = action.payload.value
            }

        }
    }
})

export const userActions = userSlice.actions
export const userReducer = userSlice.reducer