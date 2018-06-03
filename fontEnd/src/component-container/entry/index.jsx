

/**
 * 注册登录页
 */

import React, { Component } from "react";
import { NavBar, Icon, Button, InputItem, Toast } from 'antd-mobile';
import { Link, withRouter, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as actionMethod from '../../action/index.js';

import style from './entry.css';
class entry extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isRegister: false,
            password: "",
            twoPassword: "",
            userName: ""
        }
    }
    componentDidMount() {
        let {
            async_isLogin
        } = this.props.actionMethod;
        let token = window.localStorage.getItem("token");

        async_isLogin({
            data: {
                token: token
            }
        })
    }
    componentDidUpdate() {
        let {
            isLogin
        } = this.props.userinfo;

        if (isLogin) {
            this.props.history.replace('/my')
        }
    }
    // 检查用户名
    onCheckUserName(val) {
        // 如果是注册就检测，如果是登录就存在state
        let {
            async_checkUserName,
            store_userInfo
        } = this.props.actionMethod;

        this.setState({
            userName: val
        }, () => {
            if (/ /g.test(this.state.userName) ||
                this.state.userName === "") {
                store_userInfo({
                    data: {
                        isRegisterName: false,
                        userNameTip: "用户名不能有空"
                    }
                })
            } else if (this.state.isRegister) {
                async_checkUserName({ userName: this.state.userName })
            } else {
                store_userInfo({
                    data: {
                        userName: this.state.userName,
                        isRegisterName: true,
                        userNameTip: ""
                    }
                })
            }
        })
    }
    // 检查密码是否一致
    onSetPassword(val, type) {
        // 如果第一个密码是注册状态就进行比对
        let {
            store_userInfo
        } = this.props.actionMethod;

        if (type === "one") {
            this.setState({
                password: val
            }, () => {
                if (this.state.isRegister) {
                    this.onCheckPassword()
                } else if (/ /g.test(this.state.password) ||
                    this.state.password === "") {
                    store_userInfo({
                        data: {
                            isPassword: false,
                            passwordTip: "密码不能有为空或空格"
                        }
                    })
                } else {
                    store_userInfo({
                        data: {
                            isPassword: true,
                            passwordTip: ""
                        }
                    })
                }
            })
        } else {
            this.setState({
                twoPassword: val
            }, () => {
                this.onCheckPassword()
            })
        }
    }
    // 比对两次密码
    onCheckPassword() {
        let {
            store_userInfo
        } = this.props.actionMethod;
        let {
            password,
            twoPassword
        } = this.state;

        if (password === "" ||
            password !== twoPassword ||
            / /g.test(password + twoPassword)) {
            store_userInfo({
                data: {
                    isPassword: false,
                    passwordTip: "两次密码不一致并且不能有空格"
                }
            })
        } else {
            store_userInfo({
                data: {
                    isPassword: true,
                    passwordTip: "两次密码匹配成功"
                }
            })
        }
    }
    // 切换注册登录
    onTab(tab) {
        let {
            store_userInfo
        } = this.props.actionMethod;
        let {
            userName
        } = this.props.userinfo

        this.setState({
            isRegister: !this.state.isRegister
        }, () => {
            let {
                userName,
                password
            } = this.state;

            this.onCheckUserName(userName);
            this.onSetPassword(password, "one")
        })
    }
    // 提交
    onSubmit() {
        let {
            isRegister,
            password,
            twoPassword
        } = this.state;
        let {
            isRegisterName,
            isPassword,
            userName
        } = this.props.userinfo;
        let {
            async_register,
            async_login
        } = this.props.actionMethod;

        let canRegister = isRegister && isPassword && isRegisterName;
        let canLogin = !isRegister && isPassword && isRegisterName;

        if (canRegister) {
            async_register({
                userName,
                password,
                twoPassword
            })
        }
        if (canLogin) {
            async_login({
                userName,
                password
            })
        }
    }

    render() {
        let {
            isRegisterName,
            userNameTip,
            isPassword,
            passwordTip,
            isLogin,
            userName
        } = this.props.userinfo;

        return (
            <div className="entry">
                <NavBar
                    mode="light"
                >注册/登录</NavBar>

                <div className={`${style.wrap}`}>
                    <div className={`${style.logo}`}>
                        <div className={`${style.logoPic}`}>
                            <img src="http://127.0.0.1:3008/images/logo.jpg" alt="" />
                        </div>
                    </div>
                    <InputItem
                        type="text"
                        placeholder="用户名"
                        onChange={(e) => { this.onCheckUserName(e) }}
                        onFocus={(e) => { this.onCheckUserName(e) }}
                    >用户名</InputItem>
                    <p className={`${style.tip}`}>
                        {!isRegisterName ? userNameTip : ''}
                    </p>

                    <InputItem
                        type="password"
                        placeholder="密码"
                        onChange={(e) => {
                            this.onSetPassword(e, "one")
                        }}
                        onFocus={(e) => {
                            this.onSetPassword(e, "one")
                        }}
                    >密码</InputItem>
                    {
                        this.state.isRegister ? (
                            <div>
                                <InputItem
                                    type="password"
                                    placeholder="密码"
                                    onChange={(e) => {
                                        this.onSetPassword(e, "two")
                                    }}
                                    onFocus={(e) => {
                                        this.onSetPassword(e, "two")
                                    }}
                                >确认密码</InputItem>
                            </div>
                        ) : ""
                    }
                    <p className={`${style.tip}`}>
                        {!isPassword ? passwordTip : ''}
                    </p>

                    <div className={`${style.tab}`} >
                        {/* <span
                            onClick={(e) => { this.onTab('forget') }}
                        >
                            忘记密码
                        </span>
                        &nbsp;&nbsp; */}
                        <span
                            onClick={(e) => { this.onTab() }}
                        >
                            {this.state.isRegister ? "登陆" : "注册"}
                        </span>
                    </div>
                    <div className={`${style.btn}`}>
                        <Button
                            type="primary"
                            activeClassName={`${style.active}`}
                            className={`${style.button}`}
                            onClick={(e) => { this.onSubmit() }}
                        >
                            {this.state.isRegister ? "注册" : "登陆"}
                        </Button>
                    </div>

                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    let {
        userinfo
    } = state
    return { userinfo };
}
const mapDispatchToProps = (dispath) => {
    return {
        actionMethod: bindActionCreators(actionMethod, dispath)
    }
}
const entry_withRouter = withRouter(entry)
const Entry = connect(
    mapStateToProps,
    mapDispatchToProps
)(entry_withRouter)
export { Entry }


