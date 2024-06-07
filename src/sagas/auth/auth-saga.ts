
import { takeLatest } from 'redux-saga/effects';
import { authLogout, authRefreshToken, authRegister, authLogin, authLoginGoogle } from './auth-slice';

import { handleAuthRegister, handleAuthLoginRequest, handleAuthRefreshTokenRequest, handleAuthLogout, handleAuthLoginGoogleRequest } from './auth-handlers';


export default function* authSaga() {

    yield takeLatest(authRegister, handleAuthRegister);
    yield takeLatest(authLogin, handleAuthLoginRequest);
    yield takeLatest(authRefreshToken, handleAuthRefreshTokenRequest);
    yield takeLatest(authLogout, handleAuthLogout);
    yield takeLatest(authLoginGoogle, handleAuthLoginGoogleRequest);

}