

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
        this.autoFocusInst.doClear()
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
        let {
            store_habitData
        } = this.props.actionMethod

        if (!isLogin) {
            this.props.history.replace('/entry')
        }
    }
    componentWillUnmount() {
        let {
            store_habitData
        } = this.props.actionMethod;
        // 返回上一页前清空搜索结果，不清空会影响习惯图文列表中的加入功能。
        setTimeout(() => {
            store_habitData({
                data: {
                    searchResult: []
                }
            })
        }, 0)
    }
    forward(e) {
        this.props.history.push(e);
    }
    goBack(val) {
        this.props.history.goBack()
    }
    onChange(val) {
        let {
            async_searchHabit
        } = this.props.actionMethod;
        let userId = window.localStorage.getItem('userId');
        let habitName = val ? val.replace(/ /g, '') : "";
        async_searchHabit({
            userId,
            habitName
        })
    }
    createHabit(val, index) {
        let {
            async_createHabit
        } = this.props.actionMethod;
        let {
            searchResult
        } = this.props.habit;
        let userId = window.localStorage.getItem('userId');

        async_createHabit({
            habitName: val,
            userId
        })
    }
    addHabit(val, index) {
        let {
            async_addHabit
        } = this.props.actionMethod;
        let {
            searchResult
        } = this.props.habit;
        let userId = window.localStorage.getItem('userId');

        async_addHabit({
            habitId: searchResult[index].habitId,
            userId
        })

    }
    searchList() {
        let {
            searchResult
        } = this.props.habit;

        let showResult = searchResult.map((el, index) => {
            return (
                <List.Item
                    extra={
                        <Button
                            type="primary"
                            size="small"
                            className={el.stateName === '已加入' ? `${style.disableBtn}` : `${style.addBtn}`}
                            activeClassName={`${style.active}`}
                            onClick={(e) => {
                                if (el.stateName === '创建') {
                                    this.createHabit(el.habitName)
                                } else {
                                    this.addHabit(el.habitName, index)
                                }
                            }}
                            disabled={el.stateName === '已加入'}
                        >{el.stateName}</Button>
                    }
                    multipleLine
                    key={index}
                    style={typeof el.userCount === 'number' ? {} : { borderBottom: '4px solid #baeac2' }}
                >
                    {<div className={`${style.habitName}`}>
                        {el.habitName}
                    </div>}
                    <List.Item.Brief className={`${style.joinCount}`}>
                        {typeof el.userCount === 'number' ?
                            `${el.userCount}人参与` : el.userCount}
                    </List.Item.Brief>
                </List.Item>
            )
        })
        return showResult
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
                            this.autoFocusInst.doClear()
                        }}
                        onChange={(val) => { this.onChange(val) }}
                    />
                </div>
                <List className={`${style.searchList}`}>

                    {this.searchList()}
                </List>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    let {
        userinfo,
        habit
    } = state;
    return { userinfo, habit };
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

