
import { res } from '../constants/index.js'

// 设置默认的状态
// 把用于非异步的常量作为初始化的键，
// 因为不管有没有saga，最终数据都是存储在这里，
// 通过常量作为键名来保存不同异步返回的数据，当需要直接获取这些数据时，也可以直接从对应键来获取。

// 合并并初始化初始值。
let initialState = {

};
let allConstants = Object.keys(res)
allConstants.forEach((item, index) => {
    initialState[item] = { ...initialState[item] }
});
export default (state, action) => {

    if (typeof state === "undefined" || typeof state === "object") {
        state = initialState;
    }
    let newData = action.data;
    switch (action.type) {
        // 判断用户名是否唯一
        case res.RES_CHECK_USER_NAME:
            state[res.RES_CHECK_USER_NAME] = { ...state[res.RES_CHECK_USER_NAME], ...newData }
            return state[res.RES_CHECK_USER_NAME]

        // 返回注册信息
        case res.RES_REGISTER:
            if (newData.data.token && newData.data.code === 2) {
            window.localStorage.setItem("token", newData.data.token)
            window.localStorage.setItem("userId", newData.data.userId)
            }
            state[res.RES_REGISTER] = { ...state[res.RES_REGISTER], ...newData }
            return state[res.RES_REGISTER]

        // 返回登录信息
        case res.RES_LOGIN:
            if (newData.data.token && newData.data.code === 3) {
                window.localStorage.setItem("token", newData.data.token)
                window.localStorage.setItem("userId", newData.data.userId)
            }
            state[res.RES_LOGIN] = { ...state[res.RES_LOGIN], ...newData }
            return state[res.RES_LOGIN]

        // 返回登录验证信息
        case res.RES_ISLOGIN:
            state[res.RES_ISLOGIN] = { ...state[res.RES_ISLOGIN], ...newData }
            return state[res.RES_ISLOGIN]


        // 返回搜索结果
        case res.RES_SEARCH:
            state[res.RES_SEARCH] = { ...state[res.RES_SEARCH], ...newData }
            return state[res.RES_SEARCH]
        // 返回创建结果
        case res.RES_CREATEHABIT:
            state[res.RES_CREATEHABIT] = { ...state[res.RES_CREATEHABIT], ...newData }
            return state[res.RES_CREATEHABIT]








        default:
            return {}
    }
}