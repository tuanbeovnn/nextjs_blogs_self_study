
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { CallEffect, PutEffect, call, put, takeLatest } from 'redux-saga/effects';
import { requestsCategoryFetch, requestsGetPostByCategory, requestsGetPostById, requestsPostFetchFeed } from './post-requests';
import {
    postFetchFeedSuccess,
    postFetchFeedFailure,
    postFetchByIdSuccess,
    postFetchByIdFailure,
    postFetchById,
    postFetchByCategorySuccess,
    postFetchByCategoryFailure,
    postFetchByCategory,
    fetchByCategoryFailure,
    fetchByCategorySuccess
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

export function* handlePostByCategoryRequest(action: ReturnType<typeof postFetchByCategory>): Generator<any, void, AxiosResponse> {
    try {
        const response: AxiosResponse = yield call(requestsGetPostByCategory, action.payload);
        yield put(postFetchByCategorySuccess(response.data.details.records));
    } catch (error: any) {
        yield put(postFetchByCategoryFailure());
        if (error.response && error.response.data) {
            toast.error(error.response.data.message);
        } else {
            toast.error("An unexpected error occurred");
        }
    }
}

export function* handleFetchCategoryRequest(): Generator<CallEffect<AxiosResponse> | PutEffect, any, AxiosResponse> {
    try {
        const response: AxiosResponse = yield call(requestsCategoryFetch);
        if (response.status === 200) {
            yield put(fetchByCategorySuccess(response.data.details.records));
        }
    } catch (error: any) {
        yield put(fetchByCategoryFailure());
        if (error.response && error.response.data) {
            toast.error(error.response.data.message);
        } else {
            toast.error("An unexpected error occurred");
        }
    }
}


