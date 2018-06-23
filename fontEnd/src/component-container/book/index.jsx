
import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { Popover, NavBar, Icon, TextareaItem, ImagePicker, Button, PullToRefresh, Toast } from 'antd-mobile';
import { Link, Route, BrowserRouter, Switch, Redirect, withRouter } from 'react-router-dom';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as actionMethod from '../../action/index.js';

import WxImageViewer from 'react-wx-images-viewer';
import Detail from '../detail/index.jsx';
import style from './book.css';
const Item = Popover.Item;

const myImg = src => <img src={`https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`} className="am-icon am-icon-xs" alt="" />;

class book extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            selected: '',
            files: [],
            text: '',
            viewFile: [],
            isOpen: false,
            index: 0,
            bookWay: "simple",
            refreshing: false,
            height: document.documentElement.clientHeight,
        };
        this.handleVisibleChange = this.handleVisibleChange.bind(this)
        this.onSelect = this.onSelect.bind(this)
        this.goBack = this.goBack.bind(this);
        this.openViewer = this.openViewer.bind(this)
        this.getRecord = this.getRecord.bind(this)
    }
    componentDidMount() {
        let {
            async_isLogin,
            async_getHabit
        } = this.props.actionMethod;
        let {
            habitList = []
        } = this.props.habit;
        let token = window.localStorage.getItem("token");
        let userId = window.localStorage.getItem("userId");
        let {
            id: habitId
        } = this.props.match.params;
        async_isLogin({
            data: {
                token: token
            }
        })
        if (!(habitList.habits && habitList.habits[0])) {
            async_getHabit({
                userId
            })
        }
        const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;

        // 为什么加定时器？为了在卸载页面的时候跳过这个方法，不然会有以下报错信息（提示你不要在组件卸载的时候调用方法）
        /* 
            Warning: Can't call setState (or forceUpdate) on an unmounted component. 
            This is a no-op, but it indicates a memory leak in your application. 
            To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
        */
        setTimeout(() => this.setState({
            height: hei
        }), 0);
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
        // 当删除完已加载到本地的图文就再加载新的回来
        // 注意：render函数里只能放纯函数，不能放this.getRecord这类非纯函数。
        if (tempRecord && tempRecord.length <= 0 && isHaveDate === '1') {
            this.getRecord()
        }
    }

    componentWillUnmount() {
        let {
            store_recordData
        } = this.props.actionMethod;
        setTimeout(() => {
            store_recordData({
                data: {
                    type: '-',
                    isHaveDate: '1',
                    recordList: []
                }
            })
        }, 0)
    }

    // 获取某人的某个习惯的图文
    getRecord() {
        let {
            async_getRecord
        } = this.props.actionMethod;
        let {
            id: habitId
        } = this.props.match.params;
        let {
            tempRecord
        } = this.props.record;
        let userId = window.localStorage.getItem("userId");
        let lastRecord = tempRecord.length > 0 ? tempRecord[tempRecord.length - 1]._id : ''

        async_getRecord({
            userId,
            habitId,
            lastRecord,
            type: 'getUserHabitRecord'
        })
    }
    onChange = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
            files
        });
    }

    onClose = () => {
        this.setState({
            isOpen: false
        })
    }
    onBook(habitId) {
        let {
            async_bookHabit
        } = this.props.actionMethod;
        let userId = window.localStorage.getItem("userId");

        async_bookHabit({
            userId,
            habitId
        })
    }

    openViewer(fs, index) {
        let viewFile = []
        viewFile = fs.map((e, i) => {
            return e.url
        })
        this.setState({
            index,
            isOpen: true,
            viewFile
        })

    }
    onSelect(opt, index) {
        switch (opt.props.value) {
            case "del": (
                this.goBack("del")
            )
        }
    };
    handleVisibleChange(visible) {
        this.setState({
            visible,
        });
    };
    goBack(val) {
        let {
            store_recordData
        } = this.props.actionMethod;

        if (this.state.bookWay === "record") {
            this.setState({
                bookWay: "simple"
            })
        } else {
            // TODO 强行清空会在返回瞬间无谓加载了一次页面，解决办法是给每个习惯定义一个键。
            // 目前的办法只是为了在返回的时候闪屏，故意延迟200毫秒

            this.props.history.goBack()
            // setTimeout(() => {
            //     store_recordData({
            //         data: {
            //             type: '-',
            //             isHaveDate: '1',
            //             recordList: []
            //         }
            //     })
            // }, 200)
        }
    }
    issue(val) {
        let {
            text,
            files
        } = this.state;
        let {
            async_issueRecord
        } = this.props.actionMethod;
        let {
            id: habitId
        } = this.props.match.params;
        let userId = window.localStorage.getItem('userId');
        if (text.trim() === '') return;
        if (files[0].file.size > 5242880) {
            return (
                Toast.info('图片大小不能超过5M', 1)
            )
        }
        async_issueRecord({
            text,
            files,
            userId,
            habitId
        })
        this.state.bookWay === "record" ? (
            this.setState({
                bookWay: "simple",
                text: '',
                files: []
            })
        ) : '';
    }
    renderBook(value, bookHabit) {
        let {
            data,
            habit,
            isClockIn,
        } = bookHabit;
        let simple = (
            <div className={`${style.simple}`}>
                <div className={`${style.rotate} ${isClockIn ? style.active : ""}`}
                    onClick={() => {
                        this.onBook(habit._id)
                    }}
                >
                    <div className={`${style.front}`}>签到</div>
                    <div className={`${style.back}`}>已签到</div>
                </div>
                <div className={`${style.createRecord}`}
                    onClick={() => {
                        isClockIn ? (
                            this.setState({
                                bookWay: "record"
                            })
                        ) : ""
                    }}
                ><span className={`${isClockIn ? style.active : ""}`}>记录一下<i className={`iconfont icon-post`} /></span></div>
            </div>
        )
        let record = (
            <div className={`${style.record}`}>
                <TextareaItem
                    rows={3}
                    count={140}
                    onChange={(value) => {
                        this.setState({
                            text: value
                        })
                    }}
                />
                <div className={`${style.btn}`}>
                    <Button
                        type="primary"
                        className={`${style.qiandao}`}
                        activeClassName={`${style.active}`}
                        onClick={(e) => { this.issue() }}
                    >发布</Button>
                    <ImagePicker
                        files={this.state.files}
                        onChange={this.onChange}
                        onImageClick={(index, fs) => { this.openViewer(fs, index) }}
                        selectable={this.state.files.length < 1}
                        multiple={false}
                        name='ImagePicker'
                    />
                    {this.state.isOpen ? <WxImageViewer
                        onClose={this.onClose}
                        urls={this.state.viewFile}
                        index={this.state.index} /> : ""}
                </div>
            </div>
        )

        switch (value) {
            case "simple": return simple; break;
            case "record": return record; break;
            default: return simple;
        }
    }

    render() {
        let {
            habitList
        } = this.props.habit;
        let {
            id: bookHabitId
        } = this.props.match.params;
        let bookHabit = {}

        if (habitList.habits && habitList.habits[0]) {
            bookHabit = habitList.habits.find((item) => {
                return item.habit._id === bookHabitId
            })
        }
        if (!bookHabit) return (
            <NavBar
                mode="light"
                leftContent={<Icon type="left" />}
                onLeftClick={this.goBack}
            >
                {'请返回上一层'}
            </NavBar>
        );
        let {
            data,
            habit,
            isClockIn,
        } = bookHabit;
        let {
            tempRecord,
            isHaveDate
        } = this.props.record;
        let detail = '';

        if (tempRecord && tempRecord.length > 0) {
            detail = tempRecord.map((item, index) => {
                return (
                    <Detail key={item._id} item={item} />
                )
            })
        }
        let loading = () => {
            if (isHaveDate === '0') {
                return (<div style={{ textAlign: 'center' }}>暂无图文</div>)
            } else {
                return (<div style={{ textAlign: 'center' }}><Icon type='loading' /></div>)
            }
        }

        return (
            <div>
                <NavBar
                    mode="light"
                    leftContent={<Icon type="left" />}
                    onLeftClick={this.goBack}
                >
                    {habit ? habit.habitName : ''}
                </NavBar>
                <div>
                    <PullToRefresh
                        damping={60}
                        ref={el => this.ptr = el}
                        style={{
                            height: this.state.height,
                            overflow: 'auto',
                        }}
                        indicator={{ deactivate: '上拉可以刷新' }}
                        direction={'up'}
                        refreshing={this.state.refreshing}
                        onRefresh={() => {
                            this.getRecord()
                            console.log('shuaxin')
                        }}
                    >
                        <div className={`${style.wrap}`}>
                            {this.renderBook(this.state.bookWay, bookHabit)}
                        </div>
                        <div className={`${style.book_wrap}`}>
                            {detail ? detail : loading()}
                        </div>
                    </PullToRefresh>
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
const book_withRouter = withRouter(book)
const Book = connect(
    mapStateToProps,
    mapDispatchToProps
)(book_withRouter)
export { Book }