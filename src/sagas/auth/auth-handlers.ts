
import { LoginAction, RefreshTokenAction, RegisterAction } from '@/types';
import { logOut, saveToken } from '@/utils/auth';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { CallEffect, PutEffect, call, put } from 'redux-saga/effects';
import { requestsAuthFetchMe, requestsAuthRegister, requestsFreshToken, requestsLogin } from './auth-requests';
import { authUpdateUser } from './auth-slice';

export function* handleAuthRegister(
    action: RegisterAction
): Generator<CallEffect<AxiosResponse> | PutEffect, void, AxiosResponse> {
    const { payload } = action;
    try {
        const response: AxiosResponse = yield call(requestsAuthRegister, payload);
        if (response.status === 201) {
            toast.success("Created new account successfully");
        }
    } catch (error: any) {
        // Properly type the error based on your expected error object (e.g., AxiosError)
        if (error.response && error.response.data) {
            toast.error(error.response.data.message);
        } else {
            toast.error("An unexpected error occurred");
        }
    }
}

export function* handleAuthLoginRequest(action: LoginAction): Generator<CallEffect<AxiosResponse> | PutEffect, void, AxiosResponse> {
    const { payload } = action;
    try {
        const response: AxiosResponse = yield call(requestsLogin, payload);
        if (response.status === 200) {
            saveToken(response.data.accessToken, response.data.refreshToken);
            yield call(handleAuthFetchMeRequest, { payload: response.data.accessToken });
            toast.success("Logged in successfully");
        }
    } catch (error: any) {
        // Properly type the error based on your expected error object (e.g., AxiosError)
        if (error.response && error.response.data) {
            toast.error(error.response.data.message);
        } else {
            toast.error("An unexpected error occurred");
        }
    }
}

export function* handleAuthFetchMeRequest(action: any): Generator<CallEffect<AxiosResponse> | PutEffect, any, AxiosResponse> {
    const { payload } = action;
    try {
        const response: AxiosResponse = yield call(requestsAuthFetchMe, payload);
        if (response.status === 200) {
            yield put(
                authUpdateUser({
                    user: response.data,
                    accessToken: payload,
                })
            );
        }
    } catch (error: any) {
        // Properly type the error based on your expected error object (e.g., AxiosError)
        if (error.response && error.response.data) {
            toast.error(error.response.data.message);
        } else {
            toast.error("An unexpected error occurred");
        }
    }
}


export function* handleAuthRefreshTokenRequest(action: RefreshTokenAction): Generator<CallEffect<AxiosResponse> | PutEffect, any, AxiosResponse> {
    const { payload } = action;
    const refreshToken = {
        refreshToken: payload
    }
    try {
        const response: AxiosResponse = yield call(requestsFreshToken, refreshToken);
        if (response.status === 200) {
            saveToken(response.data.accessToken, response.data.refreshToken);
            yield call(handleAuthFetchMeRequest, { payload: response.data.accessToken });
        }
    } catch (error: any) {
        // Properly type the error based on your expected error object (e.g., AxiosError)
        if (error.response && error.response.data) {
            toast.error(error.response.data.message);
        } else {
            toast.error("An unexpected error occurred");
        }
    }
}
export function* handleAuthLogout(): Generator<CallEffect<AxiosResponse> | PutEffect, any, AxiosResponse> {

    yield put(
        authUpdateUser({
            user: undefined,
            accessToken: null,
        })
    );
    logOut();
}