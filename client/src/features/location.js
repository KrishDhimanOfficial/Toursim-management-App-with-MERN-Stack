import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    image_URL: '',
    tourlocations: [],
}

const tourLocationsSlice = createSlice({
    name: 'tourLocations',
    initialState,
    reducers: {
        APIToursLocation: (state, action) => {
            try {
                return action.payload
            } catch (error) {
                console.log(error)
            }
        }
    },
})


export const { APIToursLocation } = tourLocationsSlice.actions;
export default tourLocationsSlice.reducer;// export reducer to store.js