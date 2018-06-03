
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

// store
export const store_userInfo = (data) => {
    return {
        type: actionType.STORE__USER_INFO,
        data
    }
}
