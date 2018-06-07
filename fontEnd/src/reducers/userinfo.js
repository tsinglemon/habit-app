
import * as actionType from '../constants/index.js'

// 设置默认的状态
// 把用于非异步的常量作为初始化的键，
// 因为不管有没有saga，最终数据都是存储在这里，
// 通过常量作为键名来保存不同异步返回的数据，当需要直接获取这些数据时，也可以直接从对应键来获取。

// 合并并初始化初始值。
let initUserInfo = {
    isRegisterName: "",
    userNameTip: "",
    isPassword: "",
    passwordTip: "",
    isLogin: false,
    userName: "",
    token: "",
    userId: ""
};

export default (state, action) => {
    if (typeof state === "undefined") {
        state = initUserInfo;
    }
    let newData = action.data;

    switch (action.type) {
        case actionType.STORE__USER_INFO:
            if (newData.data) {
                let {
                    isRegisterName = state.isRegisterName,
                    userNameTip = state.userNameTip,
                    isPassword = state.isPassword,
                    passwordTip = state.passwordTip,
                    isLogin = state.isLogin,
                    userName = state.userName,
                    userId = state.userId,
                    token = state.token
                } = newData.data;

                state = {
                    ...state,
                    ...{
                        isRegisterName: isRegisterName,
                        userNameTip: userNameTip,
                        isPassword: isPassword,
                        passwordTip: passwordTip,
                        isLogin: isLogin,
                        userName: userName,
                        token: token,
                        userId: userId
                    }
                }
                if (isLogin) {
                    window.localStorage.setItem('userId', userId);
                    window.localStorage.setItem('token', token);
                } else {
                    window.localStorage.clear()
                }
            }
            return state
        case actionType.STORE__CLEAR:
            state = initUserInfo;
            return state

        default:
            return state
    }
}

/**
 * 登录相关的信息，
 *  用户名是否被注册；
 *  注册时密码是否一样；
 *  登录时用户名是否存在；
 *  登录时密码是否正确；
 *  注册成功有保存什么；
 *  登录成功保存什么；
 */
