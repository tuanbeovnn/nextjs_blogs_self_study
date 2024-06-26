
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { CallEffect, PutEffect, call, put } from 'redux-saga/effects';
import { requestsCategoryFetch, requestsGetPostBySlug, requestsPostFetchFeed } from './post-requests';
import {
    fetchByCategoryFailure,
    fetchByCategorySuccess,
    postFetchByCategory,
    postFetchByCategoryFailure,
    postFetchByCategorySuccess,
    postFetchById,
    postFetchByIdFailure,
    postFetchByIdSuccess,
    postFetchByUserId,
    postFetchByUserIdFailure,
    postFetchByUserIdSuccess,
    postFetchFeed,
    postFetchFeedFailure,
    postFetchFeedSuccess
} from './post-slice';


export function* handlePostFeedRequest(action: ReturnType<typeof postFetchFeed>): Generator<CallEffect<AxiosResponse> | PutEffect, any, AxiosResponse> {
    try {
        const response: AxiosResponse = yield call(requestsPostFetchFeed, "?limit=9" + "&offset=" + action.payload);
        if (response.status === 200) {
            yield put(postFetchFeedSuccess(response.data.details));
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
        const response: AxiosResponse = yield call(requestsGetPostBySlug, action.payload);
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
        const response: AxiosResponse = yield call(requestsPostFetchFeed, "?categoryId=" + action.payload);
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

export function* handlePostByUserIdRequest(action: ReturnType<typeof postFetchByUserId>): Generator<any, void, AxiosResponse> {
    try {
        const response: AxiosResponse = yield call(requestsPostFetchFeed, "?userId=" + action.payload);
        yield put(postFetchByUserIdSuccess(response.data.details.records));
    } catch (error: any) {
        yield put(postFetchByUserIdFailure());
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


