import { configureStore } from '@reduxjs/toolkit'
import { postreducer } from '../features/post.slice'
import { AuthSliceReducer } from '../features/Auth.slice'
import { tourreducer } from '../features/tour.slice'

const store = configureStore({
    reducer: {
        posts: postreducer,
        auth: AuthSliceReducer,
        tours: tourreducer
    }
})

export default store