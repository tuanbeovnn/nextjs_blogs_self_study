import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PostsState {
    listPost: any[];
}

const initialState: PostsState = {
    listPost: [],
};

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postFetchFeedSuccess: (state, action: PayloadAction<any[]>) => {
            state.listPost = action.payload;
        },
    },
});

export const { postFetchFeedSuccess } = postSlice.actions;

export default postSlice.reducer;