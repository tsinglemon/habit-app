

import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, take } from 'redux-saga/effects';
import axios from "axios";

import { req, res } from '../constants/index.js'
import allAction from '../action/index.js';

function* userInfo(data) {
    switch (data.type) {
        case req.REQ_CHECK_USER_NAME:
            try {
                const user = yield call(axios.post, "/api/user/checkUserName", {
                    name: data.data.userName
                })
                yield put(allAction.update_isOnlyUserName(user));
            } catch (e) {
                console.log(e)
            }
            break;
        case req.REQ_REGISTER:
            try{
                const regUser = yield call(axios.post, "/api/user/register", {
                    name: data.data.name,
                    password:data.data.password,
                    rePassword:data.data.rePassword,
                })
                yield put(allAction.update_register(regUser));
            }catch(e){
                console.log(e)
            }
    }




}

export function* habitSaga() {
    yield takeLatest(req.REQ_CHECK_USER_NAME, userInfo)
    yield takeLatest(req.REQ_REGISTER, userInfo)
}