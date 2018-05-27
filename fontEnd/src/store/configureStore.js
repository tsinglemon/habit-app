
import {createStore,applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga'


import rootReducer from '../reducers';
import {habitSaga} from '../saga/index.js';

export default function configureStore(initialState){
    const sagaMiddleware  = createSagaMiddleware();
    const middlewares = [sagaMiddleware]
    const store = createStore(
        rootReducer,
        applyMiddleware(...middlewares),
        initialState,
        window.devToolsExtension?window.devToolsExtension():undefined
    )
    sagaMiddleware.run(habitSaga)
    return store;
}