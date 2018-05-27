
/**
 * 返回一个简单对象，用来携带信息
 */

import {req,res} from '../constants/index.js'
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

// 获取注册回执
function get_register(data) {
    return {
        type: res.RES_REGISTER,
        data: data
    }
}


export default {
    req_checkUserName,
    req_register,
    get_register
}