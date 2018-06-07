

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
function* habit(action) {
    switch (action.type) {
        case actionType.SEARCH:
            try {
                let sagaData = yield call(axios.get, "/api/habit/search", {
                    params: {
                        habitName: action.data.habitName,
                        userId: action.data.userId
                    }
                })
                yield put(actionMethod.store_habitData(sagaData));
            } catch (e) {
                console.log(e)
            }
            break;
        case actionType.CREATE_HABIT:
            try {
                let sagaData = yield call(axios.get, "/api/habit/createHabit", {
                    params: {
                        habitName: action.data.habitName,
                        userId: action.data.userId,
                    }
                })
                yield put(actionMethod.store_habitData(sagaData));
            } catch (e) {
                console.log(e)
            }
            break;
        case actionType.ADD_HABIT:
            try {
                let sagaData = yield call(axios.get, "/api/habit/addHabit", {
                    params: {
                        habitId: action.data.habitId,
                        userId: action.data.userId,
                    }
                })
                yield put(actionMethod.store_habitData(sagaData));
            } catch (e) {
                console.log(e)
            }
            break;
        case actionType.GET_HABIT:
            try {
                let sagaData = yield call(axios.get, "/api/habit/getHabits", {
                    params: {
                        userId: action.data.userId,
                    }
                })
                // console.log(sagaData)
                yield put(actionMethod.store_habitData(sagaData));
            } catch (e) {
                console.log(e)
            }
            break;
        case actionType.DEL_HABIT:
            try {
                let sagaData = yield call(axios.get, "/api/habit/delHabit", {
                    params: {
                        userId: action.data.userId,
                        habitId:action.data.habitId
                    }
                })
                console.log(sagaData)
                yield put(actionMethod.store_habitData(sagaData));
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
    // 搜索习惯
    yield takeLatest(actionType.SEARCH, habit)
    // 创建习惯
    yield takeLatest(actionType.CREATE_HABIT, habit)
    // 添加习惯
    yield takeLatest(actionType.ADD_HABIT, habit)
    // 获取习惯
    yield takeLatest(actionType.GET_HABIT, habit)
    // 删除习惯
    yield takeLatest(actionType.DEL_HABIT, habit)

}

