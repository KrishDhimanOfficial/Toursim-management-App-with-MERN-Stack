import { configureStore } from '@reduxjs/toolkit'
import TourLocationReducer from '../features/location'
import postReducer from '../features/post'


const store = configureStore({
    reducer: {
        tourlocations: TourLocationReducer,
        post: postReducer
    }
})

export default store