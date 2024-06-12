import { CategoryItemType, PostType } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';



interface PostsState {
    listPost: PostType[];
    loading: boolean;
    postDetail: PostType | {};
    listPostByCategory: PostType[];
    listPostByUserId: PostType[];
    listCatagory: CategoryItemType[];

}

const initialState: PostsState = {
    listPost: [],
    loading: false,
    postDetail: {},
    listPostByCategory: [],
    listPostByUserId: [],
    listCatagory: [],
};


const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postFetchFeed: (state, action: PayloadAction<number>) => {
            state.loading = true;
        },
        postFetchFeedSuccess: (state, action: PayloadAction<PostType[]>) => {
            state.listPost = action.payload;
            state.loading = false;
        },
        postFetchFeedFailure: (state) => {
            state.loading = false;
        },
        postFetchById: (state, action: PayloadAction<string>) => {
            state.loading = true;
        },
        postFetchByIdSuccess: (state, action: PayloadAction<PostType>) => {
            state.postDetail = action.payload;
            state.loading = false;
        },
        postFetchByIdFailure: (state) => {
            state.loading = false;
        },
        postFetchByCategory: (state, action: PayloadAction<string>) => {
            state.loading = true;
        },
        postFetchByCategorySuccess: (state, action: PayloadAction<PostType[]>) => {
            state.listPostByCategory = action.payload;
            state.loading = false;
        },
        postFetchByCategoryFailure: (state) => {
            state.loading = false;
        },
        fetchByCategory: (state, action: PayloadAction) => {
            state.loading = true;
        },
        fetchByCategorySuccess: (state, action: PayloadAction<CategoryItemType[]>) => {
            state.listCatagory = action.payload;
            state.loading = false;
        },
        fetchByCategoryFailure: (state) => {
            state.loading = false;
        },
        postFetchByUserId: (state, action: PayloadAction<string>) => {
            state.loading = true;
        },
        postFetchByUserIdSuccess: (state, action: PayloadAction<PostType[]>) => {
            state.listPostByUserId = action.payload;
            state.loading = false;
        },
        postFetchByUserIdFailure: (state) => {
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
    postFetchByCategory,
    postFetchByCategorySuccess,
    postFetchByCategoryFailure,
    fetchByCategory,
    fetchByCategorySuccess,
    fetchByCategoryFailure,
    postFetchByUserId,
    postFetchByUserIdSuccess,
    postFetchByUserIdFailure,
} = postSlice.actions;

export default postSlice.reducer;