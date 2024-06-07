
import { LoginAction, RefreshTokenAction, RegisterAction } from '@/types';
import { logOut, saveToken } from '@/utils/auth';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { CallEffect, PutEffect, call, put } from 'redux-saga/effects';
import { requestsAuthFetchMe, requestsAuthGoogleLogin, requestsAuthRegister, requestsFreshToken, requestsLogin } from './auth-requests';
import { authLoginFailure, authLoginGoogleFailure, authLoginGoogleSuccess, authLoginSuccess, authRegisterFailure, authRegisterSuccess, authUpdateUser } from './auth-slice';

export function* handleAuthRegister(action: { payload: object }) {
    try {
        const response: AxiosResponse = yield call(requestsAuthRegister, action.payload);
        if (response.status === 201) {
            // If registration is successful, dispatch the success action
            yield put(authRegisterSuccess());
            toast.success("Created new account successfully");
        }
    } catch (error: any) {
        // If an unexpected error occurs (e.g., network error), dispatch the failure action with a generic error message
        yield put(authRegisterFailure(error.response ? error.response.data.message : 'An unexpected error occurred'));
        toast.error(error.response ? error.response.data.message : 'An unexpected error occurred');
    }
}

export function* handleAuthLoginRequest(action: { payload: object }) {
    try {
        const response: AxiosResponse = yield call(requestsLogin, action.payload);
        if (response.status === 200) {
            saveToken(response.data.accessToken, response.data.refreshToken);
            yield call(handleAuthFetchMeRequest, { payload: response.data.accessToken });
            yield put(authLoginSuccess());
            toast.success("Logged in successfully");
        }
    } catch (error: any) {
        yield put(authLoginFailure(error.response ? error.response.data.message : 'An unexpected error occurred'));
        toast.error(error.response ? error.response.data.message : 'An unexpected error occurred');
    }
}

export function* handleAuthFetchMeRequest(action: any): Generator<CallEffect<AxiosResponse> | PutEffect, any, AxiosResponse> {
    const { payload } = action;
    try {
        const response: AxiosResponse = yield call(requestsAuthFetchMe, payload);
        console.log(response.data.details)
        if (response.status === 200) {
            yield put(
                authUpdateUser({
                    user: response.data.details,
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
        yield put(
            authUpdateUser({
                user: undefined,
                accessToken: null,
            })
        );
        logOut();
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

export function* handleAuthLoginGoogleRequest(action: { payload: object }) {
    try {
        const response: AxiosResponse = yield call(requestsAuthGoogleLogin, action.payload);
        if (response.status === 200) {
            saveToken(response.data.accessToken, response.data.refreshToken);
            yield call(handleAuthFetchMeRequest, { payload: response.data.accessToken });
            yield put(authLoginGoogleSuccess());
            toast.success("Logged in successfully");
        }
    } catch (error: any) {
        const errorMessage = error.response ? error.response.data.message : 'An unexpected error occurred';
        yield put(authLoginGoogleFailure(errorMessage));
        toast.error(errorMessage);
    }
}