import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    tours: {},
    searchedPackages: JSON.parse(localStorage.getItem('searchPackages')) || []
}

const tourSlice = createSlice({
    name: 'tour',
    initialState,
    reducers: {
        alltours: (state, action) => {
            return action.payload
        },
        searchedPackages: (state, action) => {
            state.searchedPackages = action.payload
            localStorage.setItem('searchPackages', JSON.stringify(action.payload))
        }
    }
})

export const { alltours, searchedPackages } = tourSlice.actions;
export const tourreducer = tourSlice.reducer;