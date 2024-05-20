
import {takeLatest } from 'redux-saga/effects';
import { authLogin, authLogout, authRefreshToken, authRegister } from './auth-slice';

import { handleAuthRegister, handleAuthLoginRequest, handleAuthRefreshTokenRequest, handleAuthLogout } from './auth-handlers';


export default function* authSaga() {

    yield takeLatest(authRegister.type, handleAuthRegister);
    yield takeLatest(authLogin.type, handleAuthLoginRequest);
    yield takeLatest(authRefreshToken.type, handleAuthRefreshTokenRequest);
    yield takeLatest(authLogout.type, handleAuthLogout);

}