
import { res } from '../constants/index.js'

// 设置默认的状态
// 把用于非异步的常量作为初始化的键，
// 因为不管有没有saga，最终数据都是存储在这里，
// 通过常量作为键名来保存不同异步返回的数据，当需要直接获取这些数据时，也可以直接从对应键来获取。
let initialState = {};
let allConstants = Object.keys(res)
allConstants.forEach((item, index) => {
    initialState[item] = {}
});
// console.log(initialState)
export default (state, action) => {
    
    if(typeof state === "undefined"||typeof state === "object"){
        state = initialState;
    }
    switch (action.type) {
        // 判断用户名是否唯一
        case res.RES_CHECK_USER_NAME:
        
            let newData = action.data;
            state[res.RES_CHECK_USER_NAME] = { ...state[res.RES_CHECK_USER_NAME] ,...newData }
            
            return state[res.RES_CHECK_USER_NAME]
        // 返回注册信息
        case res.RES_REGISTER:
            console.log(2)
            return action.data








        default:
        console.log(3)
            return {}
    }
}