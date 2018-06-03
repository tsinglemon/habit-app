
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
 * 
 * 习惯创建、添加、删除相关的信息，
 * 图文记录的相关信息
 */



/**
 * reducer：匹配对应action.type，主要是用来处理和保存数据，
 */

 /**
  * 展示搜索结果：在服务器完成数据合并再返回客户端，
  *     1、拿到关键词对应结果（对结果进行分页，记住页数）和用户对应的所有习惯；
  *     2、然后把他们合并起来，要求把用户已添加的习惯以不同的方式区分开；
  *     3、在客户端根据不同的标记区分未创建、已创建未添加、已创建已添加；
  *     4、选择习惯后保留搜索结果以便用户继续选择加入其它展示中的习惯，并更新习惯添加的状态，允许在这里取消添加；
  *     5、当返回个人习惯列表后刷新整个列表；
  * 
  * 发起异步请求的actionType需要不一样，但发送给reducer的actionType可以是一样的，通过对象的合并功能就可以更新组件。
  * 搜索，saga1，reducer1，展示；
  * 加入，saga2，reducer1，合并第一次的搜索结果并展示；
  * 这样就实现了加入某个习惯后还能保留搜索结果并更新加入状态。
  * 
  * 需要合并的数据需要返回习惯名（用于定位第几个）和加入状态，然后替换
  * 
  * 
  * 总结：不同的请求的actionType不能一样，但是不同的数据来源可以和同一个actionType进行数据合并并更新组件。
  * 也就是请求的actionType肯定不会比reducer的actionType少。
  * 也意味他们的actionType可以不相等。
  */