import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    image_URL: '',
    tourlocations: [],
    status: 'idle',
    error: null
}

const tourLocationsSlice = createSlice({
    name: 'tourLocations',
    initialState,
    reducers: {
        APILocationsData: (state, action) => {
            try {
                return action.payload
            } catch (error) {
                console.log(error)
            }
        }
    },
})


export const { APILocationsData } = tourLocationsSlice.actions;
export default tourLocationsSlice.reducer;// export reducer to store.js