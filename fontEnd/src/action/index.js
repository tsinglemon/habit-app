
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



/**
 * update_ 前缀用于获取或者更新
 */
// 获取用户名是否唯一
function update_isOnlyUserName(data) {
    return {
        type: res.RES_CHECK_USER_NAME,
        data: data
    }
}
// 获取注册回执
function update_register(data) {
    return {
        type: res.RES_REGISTER,
        data: data
    }
}


export default {
    req_checkUserName,
    req_register,
    update_isOnlyUserName,
    update_register
}