import { configureStore } from '@reduxjs/toolkit'
import { postreducer } from '../features/post.slice'
import { AuthSliceReducer } from '../features/Auth.slice'

const store = configureStore({
    reducer: {
        posts: postreducer,
        auth: AuthSliceReducer,
    }
})

export default store