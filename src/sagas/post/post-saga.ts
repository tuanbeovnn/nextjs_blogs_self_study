
import { takeLatest } from 'redux-saga/effects';
import { fetchByCategory, postFetchByCategory, postFetchById, postFetchFeed } from './post-slice'; // Update import statement
import { handleFetchCategoryRequest, handlePostByCategoryRequest, handlePostByIdRequest, handlePostFeedRequest } from './post-handlers';

export default function* postsSaga() {
    yield takeLatest(postFetchFeed.type, handlePostFeedRequest);
    yield takeLatest(postFetchById.type, handlePostByIdRequest);
    yield takeLatest(postFetchByCategory.type, handlePostByCategoryRequest);
    yield takeLatest(fetchByCategory.type, handleFetchCategoryRequest);
}


