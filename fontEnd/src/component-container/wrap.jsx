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
        let tab = props.location.pathname.replace("/", "")
        this.state = {
            selectedTab: tab,
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

        if (!isLogin) {
            this.props.history.replace('/entry')
        }
    }

    render() {
        return (
            <div style={{ position: 'fixed', height: '100%', width: '100%' }}>
                <Route exact path="/" render={() => (
                    <Redirect to="/my" />
                )} />
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
                            background: 'url(http://192.168.1.101:3008/icon-svg/habit.svg) center center /  24px 24px no-repeat'
                        }}
                        />
                        }
                        selectedIcon={<div style={{
                            width: '24px',
                            height: '24px',
                            background: 'url(http://192.168.1.101:3008/icon-svg/habit-selected.svg) center center /  24px 24px no-repeat'
                        }}
                        />
                        }
                        selected={this.state.selectedTab === 'habit'}
                        badge={1}
                        onPress={() => { this.props.history.replace('/habit') }}
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
                                background: 'url(http://192.168.1.101:3008/icon-svg/discover.svg) center center /  24px 24px no-repeat'
                            }}
                            />
                        }
                        selectedIcon={
                            <div style={{
                                width: '24px',
                                height: '24px',
                                background: 'url(http://192.168.1.101:3008/icon-svg/discover-selected.svg) center center /  24px 24px no-repeat'
                            }}
                            />
                        }
                        title="发现"
                        key="discover"
                        badge={'new'}
                        selected={this.state.selectedTab === 'discover'}
                        onPress={() => { this.props.history.replace('/discover') }}
                        data-seed="logId1"
                    >
                        {<Discover />}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <div style={{
                                width: '24px',
                                height: '24px',
                                background: 'url(http://192.168.1.101:3008/icon-svg/favorite.svg) center center /  24px 24px no-repeat'
                            }}
                            />
                        }
                        selectedIcon={
                            <div style={{
                                width: '24px',
                                height: '24px',
                                background: 'url(http://192.168.1.101:3008/icon-svg/favorite-selected.svg) center center /  24px 24px no-repeat'
                            }}
                            />
                        }
                        title="收藏"
                        key="favorite"
                        dot
                        selected={this.state.selectedTab === 'favorite'}
                        onPress={() => { this.props.history.replace('/favorite') }}
                    >
                        <Favorite />
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <div style={{
                                width: '24px',
                                height: '24px',
                                background: 'url(http://192.168.1.101:3008/icon-svg/my.svg) center center /  24px 24px no-repeat'
                            }}
                            />}
                        selectedIcon={
                            <div style={{
                                width: '24px',
                                height: '24px',
                                background: 'url(http://192.168.1.101:3008/icon-svg/my-selected.svg) center center /  24px 24px no-repeat'
                            }}
                            />
                        }
                        title="我的"
                        key="my"
                        selected={this.state.selectedTab === 'my'}
                        onPress={() => { this.props.history.replace('/my') }}
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
        userinfo
    } = state
    return { userinfo };
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