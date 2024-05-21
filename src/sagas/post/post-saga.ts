
import { takeLatest } from 'redux-saga/effects';
import { postFetchFeed } from './post-slice'; // Update import statement
import { handlePostFeedRequest } from './post-handlers';

export default function* postsSaga() {
    yield takeLatest(postFetchFeed.type, handlePostFeedRequest);
}


