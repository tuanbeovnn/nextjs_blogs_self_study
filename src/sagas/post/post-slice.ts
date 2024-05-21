import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PostItem {
    "id": number,
    "title": string,
    "content": string,
}
interface PostsState {
    listPost: PostItem[];
    loading: boolean
}

const initialState: PostsState = {
    listPost: [],
    loading: false,
};


const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postFetchFeed: (state, action: PayloadAction) => {
            state.loading = true;
        },
        postFetchFeedSuccess: (state, action: PayloadAction<PostItem[]>) => {
            state.listPost = action.payload;
        },
    },
});

export const { postFetchFeedSuccess, postFetchFeed } = postSlice.actions;

export default postSlice.reducer;