import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    userIsLoggedIn: false,
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
    }
})

export const { registerUser, loginUser } = AuthSlice.actions;
export const AuthSliceReducer = AuthSlice.reducer;