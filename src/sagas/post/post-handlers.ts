
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { CallEffect, PutEffect, call, put, takeLatest } from 'redux-saga/effects';
import { requestsGetPostById, requestsPostFetchFeed } from './post-requests';
import {
    postFetchFeedSuccess,
    postFetchFeedFailure,
    postFetchByIdSuccess,
    postFetchByIdFailure,
    postFetchById
} from './post-slice';


export function* handlePostFeedRequest(): Generator<CallEffect<AxiosResponse> | PutEffect, any, AxiosResponse> {
    try {
        const response: AxiosResponse = yield call(requestsPostFetchFeed);
        if (response.status === 200) {
            yield put(postFetchFeedSuccess(response.data.details.records));
        }
    } catch (error: any) {
        yield put(postFetchFeedFailure());
        if (error.response && error.response.data) {
            toast.error(error.response.data.message);
        } else {
            toast.error("An unexpected error occurred");
        }
    }
}

export function* handlePostByIdRequest(action: ReturnType<typeof postFetchById>): Generator<CallEffect<AxiosResponse> | PutEffect, any, AxiosResponse> {
    try {
        const response: AxiosResponse = yield call(requestsGetPostById, action.payload);
        console.log(response.data.details)
        if (response.status === 200) {
            yield put(postFetchByIdSuccess(response.data.details));
        }
    } catch (error: any) {
        yield put(postFetchByIdFailure());
        if (error.response && error.response.data) {
            toast.error(error.response.data.message);
        } else {
            toast.error("An unexpected error occurred");
        }
    }
}

