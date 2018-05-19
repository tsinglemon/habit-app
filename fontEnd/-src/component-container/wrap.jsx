import React, { Component } from "react";
import { TabBar, Tabs, Badge } from 'antd-mobile';

import {Habit} from '../component-container/habit.jsx';
import {Discover} from '../component-container/discover.jsx';

// 没有模块化的样式可以全局共享，所以放在组件最外层
// 模块化只针对单个组件有效
import '../static/stylesheet/index.css';
import '../static/stylesheet/normal.css';
import '../static/fonts/iconfont.css';
class Wrap extends Component {
    constructor(props) {
        super(props);
        let tab = props.location.pathname==='/'||
            props.location.pathname==='/habit'?'discover':
            props.location.pathname.replace("/","")
        this.state = {
            selectedTab: tab
        }
    }

    render() {
        return (
            <div style={{ position: 'fixed', height: '100%', width: '100%' }}>
                <TabBar
                    unselectedTintColor="#999"
                    tintColor="#39cc7b"
                    barTintColor="white"
                    hidden={false}
                >
                    <TabBar.Item
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
                        onPress={() => {
                            this.setState({
                                selectedTab: 'habit',
                            });
                        }}
                        data-seed="logId"
                    >
                        {<Habit/>}
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
                        onPress={() => {
                            this.setState({
                                selectedTab: 'discover',
                            });
                        }}
                        data-seed="logId1"
                    >
                    {<Discover/>}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <div style={{
                                width: '24px',
                                height: '24px',
                                background: 'url(http://192.168.1.101:3008/icon-svg/message.svg) center center /  24px 24px no-repeat'
                            }}
                            />
                        }
                        selectedIcon={
                            <div style={{
                                width: '24px',
                                height: '24px',
                                background: 'url(http://192.168.1.101:3008/icon-svg/message-selected.svg) center center /  24px 24px no-repeat'
                            }}
                            />
                        }
                        title="消息"
                        key="message"
                        dot
                        selected={this.state.selectedTab === 'message'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'message',
                            });
                        }}
                    >
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
                        onPress={() => {
                            this.setState({
                                selectedTab: 'my',
                            });
                        }}
                    >
                    </TabBar.Item>
                </TabBar>
            </div>
        );
    }

}

export default Wrap