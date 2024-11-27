import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    posts: {}
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        allPosts: (state, action) => {
            return action.payload
        }
    }
})

export const { allPosts } = postSlice.actions;
export const postreducer = postSlice.reducer;