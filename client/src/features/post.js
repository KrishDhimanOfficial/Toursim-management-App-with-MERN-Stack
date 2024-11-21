import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    image_URL: '',
    post: [],
    status: 'idle',
    error: null
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        getPosts: (state, action) => {
            return action.payload;
        }
    }
})

export const { getPosts } = postSlice.actions;
export default postSlice.reducer;  // export reducer to store.js