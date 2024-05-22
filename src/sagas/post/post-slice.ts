import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PostItem {
    "id": number,
    "title": string,
    "content": string,
}

interface CategoryItem {
    "id": number,
    "name": string,
}
interface PostsState {
    listPost: PostItem[];
    loading: boolean;
    postDetail: PostItem | {};
    listPostByCategory: PostItem[]; // Dictionary of PostItem arrays by category
    listCatagory: CategoryItem[];

}

const initialState: PostsState = {
    listPost: [],
    loading: false,
    postDetail: {},
    listPostByCategory: [],
    listCatagory: [],
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
        postFetchByCategory: (state, action: PayloadAction<string>) => {
            state.loading = true;
        },
        postFetchByCategorySuccess: (state, action: PayloadAction<PostItem[]>) => {
            state.listPostByCategory = action.payload;
            state.loading = false;
        },
        postFetchByCategoryFailure: (state) => {
            state.loading = false;
        },
        fetchByCategory: (state, action: PayloadAction) => {
            state.loading = true;
        },
        fetchByCategorySuccess: (state, action: PayloadAction<CategoryItem[]>) => {
            state.listCatagory = action.payload;
            state.loading = false;
        },
        fetchByCategoryFailure: (state) => {
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
} = postSlice.actions;

export default postSlice.reducer;