
import { takeLatest } from 'redux-saga/effects';
import { authLogout, authRefreshToken, authRegister, authLogin } from './auth-slice';

import { handleAuthRegister, handleAuthLoginRequest, handleAuthRefreshTokenRequest, handleAuthLogout } from './auth-handlers';


export default function* authSaga() {

    yield takeLatest(authRegister, handleAuthRegister);
    yield takeLatest(authLogin, handleAuthLoginRequest);
    yield takeLatest(authRefreshToken, handleAuthRefreshTokenRequest);
    yield takeLatest(authLogout, handleAuthLogout);

}