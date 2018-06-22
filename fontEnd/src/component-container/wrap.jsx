import React, { Component } from "react";
import { TabBar, Tabs, Badge } from 'antd-mobile';
import { Link, Route, BrowserRouter, Redirect, withRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import * as actionMethod from '../action/index.js';

import Habit from '../component-container/habit.jsx';
import { Discover } from '../component-container/discover.jsx';
import { Favorite } from '../component-container/favorite.jsx';
import { My } from '../component-container/my.jsx';

// 没有模块化的样式可以全局共享，所以放在组件最外层
// 模块化只针对单个组件有效
import '../static/stylesheet/index.css';
import '../static/stylesheet/normal.css';
import '../static/fonts/iconfont.css';
class wrap extends Component {
    constructor(props) {
        super(props);
        // let tab = props.location.pathname.replace("/", "")
        // this.state = {
        //     selectedTab: 'discover',
        // }
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
        this.getRecord()
    }
    componentDidUpdate() {
        let {
            isLogin
        } = this.props.userinfo;
        let {
            tempRecord,
            isHaveDate
        } = this.props.record;

        if (!isLogin) {
            this.props.history.replace('/entry')
        }
        if (tempRecord && tempRecord.length <= 0 && isHaveDate === '1') {
            console.log(tempRecord)
        }
    }
    onTab(tab) {
        let {
            store_recordData
        } = this.props.actionMethod;
        setTimeout(() => {
            store_recordData({
                data: {
                    type: '-',
                    isHaveDate: '1',
                    recordList: [],
                    bottomTab:tab
                }
            })
        }, 0)
        this.setState({
            selectedTab: this.props.record.bottomTab
        }, () => {
            if (this.state.selectedTab === 'my') {}
        })
    }
    getRecord() {
        let {
            async_getRecord
        } = this.props.actionMethod;
        let {
            tabIndex
        } = this.props.record;
        let userId = window.localStorage.getItem("userId");

        if (this.props.record.bottomTab === 'discover') {
            if (tabIndex === 1) {
                async_getRecord({
                    userId,
                    lastRecord: '',
                    type: 'getNewRecord'
                })
            } else if (tabIndex === 0) {
                async_getRecord({
                    userId,
                    lastRecord: '',
                    type: 'getHotRecord'
                })
            } else {

            }
        }
    }

    render() {
        return (
            <div style={{ position: 'fixed', height: '100%', width: '100%' }}>
                {/* <Route exact path="/" render={() => (
                    <Redirect to="/my" />
                )} /> */}
                <Route exact path="/" />
                <TabBar
                    unselectedTintColor="#999"
                    tintColor="#39cc7b"
                    barTintColor="white"
                    hidden={false}
                >
                    <TabBar.Item
                        className="aa"
                        title="习惯"
                        key="habit"
                        icon={<div style={{
                            width: '24px',
                            height: '24px',
                            background: 'url(http://tsinglemon.com/icon-svg/habit.svg) center center /  24px 24px no-repeat'
                        }}
                        />
                        }
                        selectedIcon={<div style={{
                            width: '24px',
                            height: '24px',
                            background: 'url(http://tsinglemon.com/icon-svg/habit-selected.svg) center center /  24px 24px no-repeat'
                        }}
                        />
                        }
                        selected={this.props.record.bottomTab === 'habit'}
                        // badge={1}
                        // onPress={() => { this.props.history.replace('/habit') }}
                        onPress={() => {
                            this.onTab('habit')
                        }}
                        data-seed="logId"
                    >
                        {<Habit />}
                        {renderRoutes(this.props.route.routes)}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <div style={{
                                width: '24px',
                                height: '24px',
                                background: 'url(http://tsinglemon.com/icon-svg/discover.svg) center center /  24px 24px no-repeat'
                            }}
                            />
                        }
                        selectedIcon={
                            <div style={{
                                width: '24px',
                                height: '24px',
                                background: 'url(http://tsinglemon.com/icon-svg/discover-selected.svg) center center /  24px 24px no-repeat'
                            }}
                            />
                        }
                        title="发现"
                        key="discover"
                        badge={''}
                        selected={this.props.record.bottomTab === 'discover'}
                        onPress={() => {
                            this.onTab('discover')
                        }}
                        data-seed="logId1"
                    >
                        {<Discover />}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <div style={{
                                width: '24px',
                                height: '24px',
                                background: 'url(http://tsinglemon.com/icon-svg/favorite.svg) center center /  24px 24px no-repeat'
                            }}
                            />
                        }
                        selectedIcon={
                            <div style={{
                                width: '24px',
                                height: '24px',
                                background: 'url(http://tsinglemon.com/icon-svg/favorite-selected.svg) center center /  24px 24px no-repeat'
                            }}
                            />
                        }
                        title="收藏"
                        key="favorite"
                        // dot
                        selected={this.props.record.bottomTab === 'favorite'}
                        onPress={() => {
                            this.onTab('favorite')
                        }}
                    >
                        <Favorite />
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <div style={{
                                width: '24px',
                                height: '24px',
                                background: 'url(http://tsinglemon.com/icon-svg/my.svg) center center /  24px 24px no-repeat'
                            }}
                            />}
                        selectedIcon={
                            <div style={{
                                width: '24px',
                                height: '24px',
                                background: 'url(http://tsinglemon.com/icon-svg/my-selected.svg) center center /  24px 24px no-repeat'
                            }}
                            />
                        }
                        title="我的"
                        key="my"
                        badge={0}
                        selected={this.props.record.bottomTab === 'my'}
                        onPress={() => {
                            this.onTab('my')
                        }}
                    >
                        <My />
                    </TabBar.Item>
                </TabBar>

            </div>
        );
    }

}
const mapStateToProps = (state) => {
    let {
        userinfo,
        record
    } = state
    return { userinfo, record };
}
const mapDispatchToProps = (dispath) => {
    return {
        actionMethod: bindActionCreators(actionMethod, dispath)
    }
}
const wrap_withRouter = withRouter(wrap)
const Wrap = connect(
    mapStateToProps,
    mapDispatchToProps
)(wrap_withRouter)
export { Wrap }