import { takeLatest } from 'redux-saga/effects';
import { fetchByCategory, postFetchByCategory, postFetchById, postFetchByUserId, postFetchFeed } from './post-slice';
import { handleFetchCategoryRequest, handlePostByCategoryRequest, handlePostByIdRequest, handlePostByUserIdRequest, handlePostFeedRequest } from './post-handlers';

export default function* postsSaga() {
    yield takeLatest(postFetchFeed.type, handlePostFeedRequest);
    yield takeLatest(postFetchById.type, handlePostByIdRequest);
    yield takeLatest(postFetchByCategory.type, handlePostByCategoryRequest);
    yield takeLatest(fetchByCategory.type, handleFetchCategoryRequest);
    yield takeLatest(postFetchByUserId.type, handlePostByUserIdRequest);
}
