
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
// 签到
export const async_bookHabit = (data) => {
    return {
        type: actionType.BOOK_HABIT,
        data
    }
}
// 发布图文
export const async_issueRecord = (data) => {
    return {
        type: actionType.ISSUE_RECORD,
        data
    }
}
// 获取图文
export const async_getRecord = (data) => {
    return {
        type: actionType.GET_RECORD,
        data
    }
}






// store
// 用户数据
export const store_userInfo = (data) => {
    return {
        type: actionType.STORE__USER_INFO,
        data
    }
}
// 习惯数据
export const store_habitData = (data) => {
    return {
        type: actionType.STORE__HABIT_DATA,
        data
    }
}
// 图文数据
export const store_recordData = (data) => {
    return {
        type: actionType.STORE__RECORD_DATA,
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