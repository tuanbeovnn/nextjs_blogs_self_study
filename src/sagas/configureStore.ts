import { configureStore, combineReducers } from '@reduxjs/toolkit'

import createSagaMiddleware from '@redux-saga/core';
import { reducer } from './reducer';
import rootSaga from './rootSaga';


const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
})

sagaMiddleware.run(rootSaga);

export default store;