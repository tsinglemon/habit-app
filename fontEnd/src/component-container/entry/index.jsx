

/**
 * 注册登录页
 */

import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom';
import { NavBar, Icon, Button, InputItem } from 'antd-mobile';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import style from './entry.css';
// import {req,res} from '../../constants/index.js';
import allAction from '../../action/index.js';
class entry extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isJump: false,
            userName: "",
            password: "",
            rePassword: "",
            isRegister: true,
            isUserNameTip: false,
            isPasswordTip: false
        }
        this.goBack = this.goBack.bind(this);
    }
    goBack() {
        this.props.history.goBack();
    }
    render() {
        return (
            <div className="entry">
                <NavBar
                    mode="light"
                    leftContent={this.state.isJump ? (<Icon type="left" />) : (<span />)}
                    onLeftClick={(e) => { this.goBack() }}
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
                        onBlur={(e) => {
                            // 异步请求
                            // 判断用户名有没有重复
                            this.props.allAction.req_checkUserName({helo:"我来自登录注册页面"})
                            // this.setState({
                            //     userName: e
                            // })
                            // 如果重复了就显示提示
                            // this.setState({
                            //     isUserNameTip: true
                            // })
                        }}
                    >用户名</InputItem>
                    {this.state.isUserNameTip ? (
                        <p className={`${style.tip}`}>用户名已注册</p>
                    ) : ""}

                    <InputItem
                        type="password"
                        placeholder="密码"
                        onChange={(e) => {
                            this.setState({
                                password: e
                            })
                        }}
                    >密码</InputItem>
                    {
                        this.state.isRegister ? (
                            <div>
                                <InputItem
                                    type="password"
                                    placeholder="密码"
                                    onBlur={(e) => {
                                        this.setState({
                                            rePassword: e
                                        })
                                        // 如果重复了就显示提示
                                        // this.setState({
                                        //     isPasswordTip: true
                                        // })
                                    }}
                                >确认密码</InputItem>
                                {this.state.isPasswordTip ? (
                                    <p className={`${style.tip}`}>密码不一致</p>
                                ) : ""}
                            </div>
                        ) : ""
                    }


                    <div className={`${style.tab}`} >
                        <span
                            onClick={(e) => {
                                this.setState({
                                    isRegister: !this.state.isRegister
                                })
                            }}
                        >{
                                this.state.isRegister ? "登录" : "注册"
                            }</span>
                    </div>
                    <div className={`${style.btn}`}>
                        <Button
                            type="primary"
                            activeClassName={`${style.active}`}
                            className={`${style.button}`}
                            onClick={(e) => {

                                // 提交注册登录信息，需要跳到saga
                                if (this.state.isRegister) {
                                    let { userName, password, rePassword } = this.state;
                                    console.log(userName)
                                } else {
                                    let { userName, password } = this.state;
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
    // const { hala,user } = state.userinfo;
    console.log(state)
    return { state };
}
const mapDispatchToProps = (dispath) => {
    return {
        allAction:bindActionCreators(allAction,dispath)
    }
}
const entry_withRouter = withRouter(entry)
const Entry = connect(
    mapStateToProps,
    mapDispatchToProps
)(entry_withRouter)
export { Entry }