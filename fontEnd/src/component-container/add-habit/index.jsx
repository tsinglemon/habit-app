

import React, { Component } from "react";
import { List } from 'antd-mobile';
import { Link, Route, BrowserRouter, withRouter } from 'react-router-dom';
import { NavBar, Icon, SearchBar, Button } from 'antd-mobile';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as actionMethod from '../../action/index.js';

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
    forward(e) {
        this.props.history.push(e);
    }
    goBack(val) {
        this.props.history.goBack()
    }
    onChange(val) {
        
    }
    createHabit(val) {
        
    }
    addHabit(val) {
        
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
    let {
        userinfo
    } = state;
    return { userinfo };
}
const mapDispatchToProps = (dispath) => {
    return {
        actionMethod: bindActionCreators(actionMethod, dispath)
    }
}
const addHabit_withRouter = withRouter(addHabit)
const AddHabit = connect(
    mapStateToProps,
    mapDispatchToProps
)(addHabit_withRouter)
export { AddHabit }

