import {combineReducers } from '@reduxjs/toolkit'
import authReducer from './auth/auth-slice';
import postReducer from './post/post-slice';


export const reducer = combineReducers({
    auth: authReducer,
    post: postReducer,
});

