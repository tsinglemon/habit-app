

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
                console.log(sagaData)
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
                let sagaData = yield call(axios.post, "/api/habit/delHabit", {
                    userId: action.data.userId,
                    habitId: action.data.habitId
                })
                console.log(sagaData)
                yield put(actionMethod.store_habitData(sagaData));
            } catch (e) {
                console.log(e)
            }
            break;
        case actionType.BOOK_HABIT:
            try {
                let sagaData = yield call(axios.get, "/api/habit/clockIn", {
                    params: {
                        userId: action.data.userId,
                        habitId: action.data.habitId
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
// 图文
function* record(action) {
    switch (action.type) {
        // 发布
        case actionType.ISSUE_RECORD:
            try {

                let {
                    text,
                    files,
                    userId,
                    habitId
                } = action.data;

                let formData = new FormData();
                formData.append("userId", userId)
                formData.append("habitId", habitId)
                formData.append("text", text)
                let images = files.map((item) => {
                    return item.file
                })
                for (var i = 0; i < images.length; i++) {
                    formData.append("recordImage", images[i])
                }

                let sagaData = yield call(axios.post, "/api/habit/record", formData)
                console.log(sagaData)
                yield put(actionMethod.store_recordData(sagaData));
            } catch (e) {
                console.log(e)
            }
            break;
        // 删除
        case actionType.DEL_RECORD:
            try {
                let {
                    userId,
                    recordId
                } = action.data;
                let sagaData = yield call(axios.post, "/api/habit/delRecord", {
                    userId,
                    recordId
                })
                console.log(sagaData)
                yield put(actionMethod.store_recordData(sagaData));
            } catch (e) {
                console.log(e)
            }
            break;
        // 获取
        case actionType.GET_RECORD:
            try {
                let {
                    userId,
                    habitId,
                    lastRecord,
                    type
                } = action.data;

                let sagaData = yield call(axios.get, "/api/habit/getRecord", {
                    params: {
                        userId,
                        habitId,
                        lastRecord,
                        type
                    }
                })
                console.log(sagaData)
                yield put(actionMethod.store_recordData(sagaData));
            } catch (e) {
                console.log(e)
            }
            break;
        // 点赞
        case actionType.PRAISE:
            try {
                let {
                    userId,
                    author,
                    recordId
                } = action.data;

                let sagaData = yield call(axios.get, "/api/habit/like", {
                    params: {
                        userId,
                        author,
                        recordId
                    }
                })
                console.log(sagaData)
                // return;
                yield put(actionMethod.store_recordData(sagaData));
            } catch (e) {
                console.log(e)
            }
            break;
        // 评论
        case actionType.COMMENT:
            try {
                let {
                    userId,
                    // otherUserId,
                    otherUserComment,
                    recordId,
                    content
                } = action.data;

                let sagaData = yield call(axios.post, "/api/habit/comment", {
                    userId,
                    // otherUserId,
                    otherUserComment,
                    recordId,
                    content
                })
                console.log(sagaData)
                // return;
                yield put(actionMethod.store_recordData(sagaData));
            } catch (e) {
                console.log(e)
            }
            break;
        // 删除评论
        case actionType.DEL_COMMENT:
            try {
                let {
                    userId,
                    recordId,
                    commentId,
                } = action.data;

                let sagaData = yield call(axios.post, "/api/habit/delComment", {
                    userId,
                    recordId,
                    commentId
                })
                console.log(sagaData)
                yield put(actionMethod.store_recordData(sagaData));
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
    yield takeEvery(actionType.CREATE_HABIT, habit)
    // 添加习惯
    yield takeEvery(actionType.ADD_HABIT, habit)
    // 获取习惯
    yield takeLatest(actionType.GET_HABIT, habit)
    // 删除习惯
    yield takeLatest(actionType.DEL_HABIT, habit)
    // 签到
    yield takeLatest(actionType.BOOK_HABIT, habit)
    // 发布图文
    yield takeLatest(actionType.ISSUE_RECORD, record)
    // 删除图文
    yield takeEvery(actionType.DEL_RECORD, record)
    // 获取图文
    yield takeLatest(actionType.GET_RECORD, record)
    // 点赞
    yield takeEvery(actionType.PRAISE, record)
    // 评论
    yield takeEvery(actionType.COMMENT, record)
    // 删除评论
    yield takeEvery(actionType.DEL_COMMENT, record)
    // 判断习惯是否已加入
    // yield takeEvery(actionType.IS_JOIN_HABIT, record)

    // async_isJoinHabit
}

