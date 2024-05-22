import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PostItem {
    "id": number,
    "title": string,
    "content": string,
}
interface PostsState {
    listPost: PostItem[];
    loading: boolean;
    postDetail: PostItem | {};
}

const initialState: PostsState = {
    listPost: [],
    loading: false,
    postDetail: {},
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
            state.loading = false;
        },
        postFetchFeedFailure: (state) => {
            state.loading = false;
        },
        postFetchById: (state, action: PayloadAction<string>) => { // Ensure payload type is string
            state.loading = true;
        },
        postFetchByIdSuccess: (state, action: PayloadAction<PostItem>) => {
            state.postDetail = action.payload;
            state.loading = false;
        },
        postFetchByIdFailure: (state) => {
            state.loading = false;
        },
    },
});

export const {
    postFetchFeed,
    postFetchFeedSuccess,
    postFetchFeedFailure,
    postFetchById,
    postFetchByIdSuccess,
    postFetchByIdFailure,
} = postSlice.actions;

export default postSlice.reducer;