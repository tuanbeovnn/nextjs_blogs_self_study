
import { takeLatest } from 'redux-saga/effects';
import { postFetchFeedSuccess } from './post-slice'; // Update import statement
import { handlePostFeedRequest } from './post-handlers';

export default function* postsSaga() {
    yield takeLatest(postFetchFeedSuccess.type, handlePostFeedRequest);
}


