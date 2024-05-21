
import { all, fork } from 'redux-saga/effects';
import authSaga from './auth/auth-saga';
import postsSaga from './post/post-saga';


export default function* rootSaga() {
    yield all([
        fork(authSaga),
        fork(postsSaga),
    ]);
}