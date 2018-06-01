

import React, { Component } from "react";
import { List } from 'antd-mobile';
import { Link, Route, BrowserRouter, withRouter } from 'react-router-dom';
import { NavBar, Icon, SearchBar, Button } from 'antd-mobile';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { res } from '../../constants/index.js';
import allAction from '../../action/index.js';

import style from './add-habit.css';

class addHabit extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
        this.forward = this.forward.bind(this);
        this.goBack = this.goBack.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    componentDidMount() {
        this.autoFocusInst.focus();
        let token = window.localStorage.getItem("token")
        this.props.allAction.req_isLogin({ token })
    }
    componentDidUpdate() {
        if (this.props.userinfo.data) {
            if (this.props.userinfo.data.code === 0 && this.props.userinfo.data.isLogin === false) {
                this.props.history.replace('/entry')
            } else {
                console.log("已登录")
            }
            if (this.props.userinfo.data.code === 13 && this.props.userinfo.data.msg.ok === 1) {
                this.goBack()
            }
        }

    }
    forward(e) {
        this.props.history.push(e);
    }
    goBack(val) {
        this.props.history.goBack()
    }
    onChange(val) {
        this.props.allAction.req_search({
            habitName: val
        })
    }
    createHabit(val) {
        this.props.allAction.req_createHabit({
            habitName: val
        })
    }
    addHabit(val) {
        console.log(val)
        this.props.allAction.req_addHabit({
            habitId: val
        })
    }
    addList() {
        let add = this.props.userinfo.data.msg.map((el, i) => {
            
            return (
                <List.Item
                    extra={
                        <Button
                            type="primary"
                            size="small"
                            className={`${style.addBtn}`}
                            activeClassName={`${style.active}`}
                            onClick={(e) => { this.addHabit(el._id) }}
                        >加入</Button>
                    }
                    multipleLine
                    key={i}
                >   
                    {<div className={`${style.habitName}`}>
                        {el.habitName}
                    </div>}
                    <List.Item.Brief className={`${style.joinCount}`}>
                        {`${el.userCount}`}人参与
                    </List.Item.Brief>
                </List.Item>
            )
        })
        return add
    }



    render() {
        return (
            <div className={`addHabit`}>
                <div className={`${style.wrap} searchBar`}>
                    <Icon className={`${style.back}`} type="left" color="#fff"
                        onClick={this.goBack}
                    />
                    <SearchBar className={`${style.bar}`}
                        ref={ref => this.autoFocusInst = ref}
                        showCancelButton={false}
                        onCancel={() => {
                            document.querySelector(".am-search-clear").click()
                            document.querySelector(".am-search-value").blur()
                        }}
                        onChange={(val) => { this.onChange(val) }}
                    />

                </div>
                {/* 创建 */}
                {this.props.userinfo.data && this.props.userinfo.data.code === 11 ? (
                    <List>
                        <List.Item
                            extra={
                                <Button
                                    type="primary"
                                    size="small"
                                    className={`${style.addBtn}`}
                                    activeClassName={`${style.active}`}
                                    onClick={(e) => { this.createHabit(this.props.userinfo.data.habitName) }}
                                >创建</Button>
                            }
                            multipleLine
                            onClick={() => { }}
                        >
                            {<div className={`${style.habitName}`}>
                                {this.props.userinfo.data.habitName}
                            </div>}
                            <List.Item.Brief className={`${style.joinCount}`}>未创建</List.Item.Brief>

                        </List.Item>
                    </List>) : ''}

                {/* 加入 */}
                {this.props.userinfo.data && this.props.userinfo.data.code === 12&&this.props.userinfo.data.code!==10 ? (
                    <List>
                        {this.addList()}
                    </List>) : ''}
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
const addHabit_withRouter = withRouter(addHabit)
const AddHabit = connect(
    mapStateToProps,
    mapDispatchToProps
)(addHabit_withRouter)
export { AddHabit }

