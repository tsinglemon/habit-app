

/**
 * 注册登录页
 */

import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom';
import { NavBar, Icon, Button, InputItem, Toast } from 'antd-mobile';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import style from './entry.css';
import { res } from '../../constants/index.js';
import allAction from '../../action/index.js';

class entry extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isJump: false,
            password: "",
            rePassword: "",
            isRegister: true,
            isPasswordTip: false
        }
        this.goBack = this.goBack.bind(this);
    }
    goBack() {
        this.props.history.goBack();
    }
    componentDidMount() {
        // console.log(this.props)
        // this.setState({
        //     isJump:
        // })
    }
    componentWillUpdate() {
        // console.log(this.props)
    }

    render() {
        let userName = ""
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
                            this.props.allAction.req_checkUserName({ userName: e })
                        }}
                    >用户名</InputItem>
                    <p className={`${style.tip}`}>
                        {this.props.userinfo.data ? this.props.userinfo.data.code === 1 ? this.props.userinfo.data.msg : "" : ""}
                    </p>

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
                                        if (this.state.password.replace(/ /g, "") !== e || this.state.password.replace(/ /g, "") === "") {
                                            this.setState({
                                                isPasswordTip: true
                                            })
                                        } else {
                                            this.setState({
                                                isPasswordTip: false,
                                                rePassword: e
                                            })
                                        }
                                    }}
                                >确认密码</InputItem>
                                {this.state.isPasswordTip ? (
                                    <p className={`${style.tip}`}>两次密码要一致并且不能为空</p>
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
                                if (!this.props.userinfo.data) {
                                    Toast.info('请完整输入', 1.5, null, false);
                                    return;
                                }
                                let name = this.props.userinfo.data.name,
                                    password = this.state.password,
                                    rePassword = this.state.rePassword;
                                this.props.allAction.req_register({
                                    name,
                                    password,
                                    rePassword
                                })
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