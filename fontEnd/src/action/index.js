
/**
 * action 用于携带信息
 */
import * as actionType from '../constants/index.js'

// 检查用户名
export const async_checkUserName = (data) => {
    return {
        type: actionType.CHECK_USER_NAME,
        data
    }
}
// 注册用户
export const async_register = (data) => {
    return {
        type: actionType.REGISTER,
        data
    }
}
// 登录
export const async_login = (data) => {
    return {
        type: actionType.LOGIN,
        data
    }
}
// 验证是否登陆
export const async_isLogin = (data) => {
    return {
        type: actionType.ISLOGIN,
        data
    }
}
// 搜索习惯
export const async_searchHabit = (data) => {
    return {
        type: actionType.SEARCH,
        data
    }
}
// 创建习惯
export const async_createHabit = (data) => {
    return {
        type: actionType.CREATE_HABIT,
        data
    }
}
// 添加习惯
export const async_addHabit = (data) => {
    return {
        type: actionType.ADD_HABIT,
        data
    }
}
// 获取习惯
export const async_getHabit = (data) => {
    return {
        type: actionType.GET_HABIT,
        data
    }
}
// 删除习惯
export const async_delHabit = (data) => {
    return {
        type: actionType.DEL_HABIT,
        data
    }
}

// store
export const store_userInfo = (data) => {
    return {
        type: actionType.STORE__USER_INFO,
        data
    }
}
export const store_habitData = (data) => {
    return {
        type: actionType.STORE__HABIT_DATA,
        data
    }
}

// 清空store
export const store_clear = (data) => {
    return {
        type: actionType.STORE__CLEAR,
        data
    }
}