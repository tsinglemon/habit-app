
/**
 * action 用于携带信息
 */
import {req,res} from '../constants/index.js'




/**
 * req_ 前缀用于异步请求
 */
// 检查用户名唯一性
function req_checkUserName(data) {
    return {
        type: req.REQ_CHECK_USER_NAME,
        data: data
    }
}
//  注册新用户
function req_register(data) {
    return {
        type: req.REQ_REGISTER,
        data: data
    }
}
// 登录
function req_login(data) {
    return {
        type: req.REQ_LOGIN,
        data: data
    }
}
// 是否登录
function req_isLogin(data) {
    return {
        type: req.REQ_ISLOGIN,
        data: data
    }
}



/**
 * update_ 前缀用于获取或者更新
 */
// 获取用户名是否唯一
function update_isOnlyUserName(data) {
    return {
        type: res.RES_CHECK_USER_NAME,
        data
    }
}
// 获取注册回执
function update_register(data) {
    return {
        type: res.RES_REGISTER,
        data
    }
}
// 获取登录信息
function update_login(data) {
    return {
        type: res.RES_LOGIN,
        data
    }
}
// 判断是否登录
function update_isLogin(data) {
    return {
        type: res.RES_ISLOGIN,
        data
    }
}


export default {
    req_checkUserName,
    req_register,
    req_login,
    req_isLogin,

    update_isOnlyUserName,
    update_register,
    update_login,
    update_isLogin
}