import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    tours: {},
}

const tourSlice = createSlice({
    name: 'tour',
    initialState,
    reducers: {
        alltours: (state, action) => {
            return action.payload
        },
    }
})

export const { alltours } = tourSlice.actions;
export const tourreducer = tourSlice.reducer;