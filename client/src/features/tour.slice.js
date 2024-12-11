import { createSlice } from '@reduxjs/toolkit'

const initialState = { tours: {} }

const tourSlice = createSlice({
    name: 'tour',
    initialState,
    reducers: {
        alltours: (state, action) => {
            return action.payload;
        },
        bookings: (state, action) => {
            return action.payload;
        }
    }
})

export const { alltours, bookings } = tourSlice.actions;
export const tourreducer = tourSlice.reducer;