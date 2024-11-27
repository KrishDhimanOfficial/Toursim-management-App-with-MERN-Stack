import { configureStore } from '@reduxjs/toolkit'
import { postreducer } from '../features/post.slice'

const store = configureStore({
    reducer: {
        posts: postreducer
    }
})

export default store