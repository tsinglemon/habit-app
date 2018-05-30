
import React, { Component } from "react";
import { NavBar} from 'antd-mobile';
import { Link, Route,  withRouter  } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { res } from '../constants/index.js';
import allAction from '../action/index.js';

import {MyCenter} from './my-center/index.jsx';
import style from './container.css'

class my extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
        this.outLogin = this.outLogin.bind(this);
    }
    componentDidMount(){
        // let token = window.localStorage.getItem("token")
        // this.props.allAction.req_isLogin({ token })
    }
    componentDidUpdate() {
        // if (this.props.userinfo.data) {
        //     if ( this.props.userinfo.data.code!==0) {
        //         console.log("已登录")
        //     }
        // }
    }
    outLogin(){
        window.localStorage.removeItem("token");
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
                            onClick={(e)=>{ this.outLogin() }}
                        >退出</span>
                    }
                >
                    我的中心
                </NavBar>
                <div style={{marginTop:"44px"}}>
                    <MyCenter/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    let userinfo = state.userinfo
    // console.log(userinfo)
    return { userinfo };
}
const mapDispatchToProps = (dispath) => {
    return {
        allAction: bindActionCreators(allAction, dispath)
    }
}
const my_withRouter = withRouter(my)
const My = connect(
    mapStateToProps,
    mapDispatchToProps
)(my_withRouter)
export { My }

