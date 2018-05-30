

/**
 * 注册登录页
 */

import React, { Component } from "react";
import { NavBar, Icon, Button, InputItem, Toast } from 'antd-mobile';
import { Link, withRouter, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import { res } from '../../constants/index.js';
import allAction from '../../action/index.js';

import style from './entry.css';
class entry extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLogin: false,
            userName: "",
            password: "",
            rePassword: "",
            isRegister: true,
            isPasswordSame: true,
            canRegister: false
        }
        this.goBack = this.goBack.bind(this);
    }
    goBack() {
        this.props.history.goBack();
    }
    componentDidMount() {
        let token = window.localStorage.getItem("token")
        this.props.allAction.req_isLogin({ token })
    }
    componentDidUpdate() {
        if (this.props.userinfo.data) {
            if ( this.props.userinfo.data.code !== 1&& this.props.userinfo.data.code !== 0||
                this.props.userinfo.data.code===4) {
                console.log("登录，注册，修改密码成功了")
                this.props.history.replace('/my')
            }
        }
    }

    render() {
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
                        onChange={(e) => {
                            if (this.state.isRegister) {
                                this.props.allAction.req_checkUserName({ userName: e })
                            } else {
                                this.setState({
                                    userName: e
                                })
                            }

                        }}
                    >用户名</InputItem>
                    <p className={`${style.tip}`}>
                        {
                            this.state.isRegister && this.props.userinfo.data ?
                                this.props.userinfo.data.code === 0 ? this.props.userinfo.data.msg : "" : ""}
                    </p>

                    <InputItem
                        type="password"
                        placeholder="密码"
                        onChange={(e) => {
                            if (this.state.isRegister) {
                                if (e.replace(/ /g, "") === "" || e !== this.state.rePassword) {
                                    this.setState({
                                        password: e.replace(/ /g, ""),
                                        isPasswordSame: false
                                    })
                                } else {
                                    this.setState({
                                        password: e.replace(/ /g, ""),
                                        isPasswordSame: true
                                    })
                                }
                            } else {
                                this.setState({
                                    password: e,
                                    isPasswordSame: true
                                })
                            }

                        }}
                    >密码</InputItem>
                    {
                        this.state.isRegister ? (
                            <div>
                                <InputItem
                                    type="password"
                                    placeholder="密码"
                                    onChange={(e) => {
                                        if (e.replace(/ /g, "") === "" || e !== this.state.password) {
                                            this.setState({
                                                rePassword: e.replace(/ /g, ""),
                                                isPasswordSame: false
                                            })
                                        } else {
                                            this.setState({
                                                rePassword: e.replace(/ /g, ""),
                                                isPasswordSame: true
                                            })
                                        }
                                    }}
                                >确认密码</InputItem>

                            </div>
                        ) : ""
                    }
                    {this.state.isPasswordSame ? "" :
                        (<p className={`${style.tip}`}>
                            {this.state.isRegister ? "两次密码要一致并且不能有空格" : "密码不能有空格"}
                        </p>)
                    }

                    <div className={`${style.tab}`} >
                        <span
                            onClick={(e) => {
                                this.setState({
                                    isRegister: !this.state.isRegister
                                }, () => {
                                    if (this.state.isRegister) {
                                        this.props.allAction.req_checkUserName({ userName: this.state.userName })

                                        this.setState({
                                            password: e,
                                            isPasswordSame: true
                                        })
                                    }
                                })

                            }}
                        >
                            {this.state.isRegister ? "登录" : "注册"}
                        </span>
                    </div>
                    <div className={`${style.btn}`}>
                        <Button
                            type="primary"
                            activeClassName={`${style.active}`}
                            className={`${style.button}`}
                            onClick={(e) => {
                                if (this.state.isRegister && !this.props.userinfo.data) {
                                    Toast.info('用户名不能有空格', 2, null, false);
                                    return;
                                }
                                let name = "",
                                    password = this.state.password,
                                    rePassword = this.state.rePassword;

                                // 密码不能为空
                                if (password === "" || this.state.isRegister && rePassword === "") {
                                    this.setState({
                                        isPasswordSame: false
                                    })
                                    return;
                                }
                                // 两次密码要相等
                                if (this.state.isRegister && !this.state.isPasswordSame) {
                                    return;
                                }

                                if (this.state.isRegister) {
                                    name = this.props.userinfo.data.name ? this.props.userinfo.data.name :
                                        this.state.userName,
                                        this.props.allAction.req_register({
                                            name,
                                            password,
                                            rePassword
                                        })
                                } else {
                                    name = this.state.userName ? this.state.userName : this.props.userinfo.data.name

                                    this.props.allAction.req_login({
                                        name,
                                        password
                                    })
                                }
                            }}
                        >
                            {this.state.isRegister ? "注册" : "登录"}
                        </Button>
                    </div>

                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    let userinfo = state.userinfo
    console.log(userinfo)
    return { userinfo };
}
const mapDispatchToProps = (dispath) => {
    return {
        allAction: bindActionCreators(allAction, dispath)
    }
}
const entry_withRouter = withRouter(entry)
const Entry = connect(
    mapStateToProps,
    mapDispatchToProps
)(entry_withRouter)
export { Entry }


/**
 * 明天
 * 注册成功后自动登录，然后跳转到发现页。
 */