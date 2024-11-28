import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    posts: {},
    loading: false,
    error: null,
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        allPosts: (state, action) => {
            return action.payload
        },
        singlePost: (state, action) => {
            return action.payload
        },
        categoryPost: (state, action) => {
            return action.payload
        }
    }
})

export const { allPosts, singlePost, categoryPost, setLoading } = postSlice.actions;
export const postreducer = postSlice.reducer;