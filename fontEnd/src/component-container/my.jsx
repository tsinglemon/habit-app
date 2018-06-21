
import React, { Component } from "react";
import { NavBar } from 'antd-mobile';
import { Link, Route, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as actionMethod from '../action/index.js';

import { MyCenter } from './my-center/index.jsx';
import style from './container.css'

class my extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.outLogin = this.outLogin.bind(this);
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
        if (!isLogin) {
            this.props.history.replace('/entry')
        }
    }
    outLogin() {
        let {
            store_clear
        } = this.props.actionMethod;
        window.localStorage.clear();
        store_clear({})

        this.props.history.replace('/entry')
    }

    render() {
        return (
            <div>
                <NavBar
                    mode="light"
                    rightContent={
                        // <span className={`${style.btn}`}>关注</span>
                        // <span className={`${style.btn} ${style.active}`}>已关注</span>
                        <span className={`${style.btn} ${style.active}`}
                            onClick={(e) => { this.outLogin() }}
                        >退出</span>
                    }
                >
                    我的中心
                </NavBar>
                <div style={{ marginTop: "44px" }}
                >
                    <MyCenter />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    let {
        userinfo,
        habit,
        record
    } = state
    return { userinfo, habit, record };
}
const mapDispatchToProps = (dispath) => {
    return {
        actionMethod: bindActionCreators(actionMethod, dispath)
    }
}
const my_withRouter = withRouter(my)
const My = connect(
    mapStateToProps,
    mapDispatchToProps
)(my_withRouter)
export { My }

