

import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, take } from 'redux-saga/effects';
import axios from "axios";

import { req, res } from '../constants/index.js'
import allAction from '../action/index.js';

function* userInfo(data) {
    switch (data.type) {
        case req.REQ_CHECK_USER_NAME:
            try {
                let user = yield call(axios.post, "/api/user/checkUserName", {
                    name: data.data.userName
                })
                yield put(allAction.update_isOnlyUserName(user));
            } catch (e) {
                console.log(e)
            }
            break;
        case req.REQ_REGISTER:
            try{
                let regUser = yield call(axios.post, "/api/user/register", {
                    name: data.data.name,
                    password:data.data.password,
                    rePassword:data.data.rePassword,
                })
                yield put(allAction.update_register(regUser));
            }catch(e){
                console.log(e)
            }
            break;
        case req.REQ_LOGIN:
            try{
                let login = yield call(axios.post, "/api/user/login", {
                    name: data.data.name,
                    password:data.data.password
                })
                yield put(allAction.update_login(login));
            }catch(e){
                console.log(e)
            }
            break;
        case req.REQ_ISLOGIN:
            try{
                let isLogin = yield call(axios.post, "/api/user/islogin", {
                    token:data.data.token
                })
                yield put(allAction.update_isLogin(isLogin));
            }catch(e){
                console.log(e)
            }
    }




}

export function* habitSaga() {
    // 检查用户名
    yield takeLatest(req.REQ_CHECK_USER_NAME, userInfo)
    // 注册
    yield takeLatest(req.REQ_REGISTER, userInfo)
    // 登录
    yield takeLatest(req.REQ_LOGIN, userInfo)
    // 登录
    yield takeLatest(req.REQ_ISLOGIN, userInfo)
}