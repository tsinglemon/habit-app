

import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, take } from 'redux-saga/effects';
import axios from "axios";

import * as actionType from '../constants/index.js'
import * as actionMethod from '../action/index.js';

function* userInfo(action) {
    switch (action.type) {
        case actionType.CHECK_USER_NAME:
            try {
                let sagaData = yield call(axios.post, "/api/user/checkUserName", {
                    userName: action.data.userName
                })
                yield put(actionMethod.store_userInfo(sagaData));
            } catch (e) {
                console.log(e)
            }
            break;
            case actionType.REGISTER:
                try {
                    let sagaData = yield call(axios.post, "/api/user/register", {
                        userName: action.data.userName,
                        password: action.data.password,
                        twoPassword: action.data.twoPassword
                    })
                    yield put(actionMethod.store_userInfo(sagaData));
                } catch (e) {
                    console.log(e)
                }
                break;
        case actionType.LOGIN:
            try {
                let sagaData = yield call(axios.post, "/api/user/login", {
                    userName: action.data.userName,
                    password: action.data.password
                })
                yield put(actionMethod.store_userInfo(sagaData));
            } catch (e) {
                console.log(e)
            }
            break;
        case actionType.ISLOGIN:
            try {
                let sagaData = yield call(axios.post, "/api/user/islogin", {
                    token: action.data.data.token
                })
                yield put(actionMethod.store_userInfo(sagaData));
            } catch (e) {
                console.log(e)
            }
            break;
    }
}

export function* habitSaga() {
    // 检查用户名
    yield takeLatest(actionType.CHECK_USER_NAME, userInfo)
    // 注册
    yield takeLatest(actionType.REGISTER, userInfo)
    // 验证登录
    yield takeLatest(actionType.ISLOGIN, userInfo)
    // 登录
    yield takeLatest(actionType.LOGIN, userInfo)

}

