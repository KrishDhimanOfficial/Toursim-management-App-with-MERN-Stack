import { configureStore } from '@reduxjs/toolkit'
import  TourLocationReducer  from '../features/location'


const store = configureStore({
    reducer: {
        tourlocations: TourLocationReducer
    }
})

export default store