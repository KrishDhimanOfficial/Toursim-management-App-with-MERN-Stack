import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    errorstate: false,
    errorMessage: ''
}

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        registerUser: (state, action) => {
            state.errorstate = true;
            state.errorMessage = action.payload;
        },
        loginUser: (state, action) => {
            state.errorstate = true;
            state.errorMessage = action.payload;
        },
        saveUser: (state, action) => {
            state.user = action.payload;
        }
    }
})

export const { registerUser, loginUser, saveToken,saveUser } = AuthSlice.actions;
export const AuthSliceReducer = AuthSlice.reducer;