
import { takeLatest } from 'redux-saga/effects';
import { postFetchById, postFetchFeed } from './post-slice'; // Update import statement
import { handlePostByIdRequest, handlePostFeedRequest } from './post-handlers';

export default function* postsSaga() {
    yield takeLatest(postFetchFeed.type, handlePostFeedRequest);
    yield takeLatest(postFetchById.type, handlePostByIdRequest);
}


