
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { CallEffect, PutEffect, call, put, takeLatest } from 'redux-saga/effects';
import { requestsPostFetchFeed } from './post-requests';

import { postFetchFeedSuccess } from './post-slice';


export function* handlePostFeedRequest(): Generator<CallEffect<AxiosResponse> | PutEffect, any, AxiosResponse> {
    try {
        const response: AxiosResponse = yield call(requestsPostFetchFeed);
        if (response.status === 200) {
            yield put(postFetchFeedSuccess(response.data.details.records));
        }
    } catch (error: any) {
        if (error.response && error.response.data) {
            toast.error(error.response.data.message);
        } else {
            toast.error("An unexpected error occurred");
        }
    }
}