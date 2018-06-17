
import React, { Component } from "react";
import { Popover, NavBar, Icon, TextareaItem, ImagePicker, Button } from 'antd-mobile';
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
            bookWay: "simple"

        };
        this.handleVisibleChange = this.handleVisibleChange.bind(this)
        this.onSelect = this.onSelect.bind(this)
        this.goBack = this.goBack.bind(this);
        this.openViewer = this.openViewer.bind(this)
    }
    componentDidMount() {
        let {
            async_isLogin,
            async_getHabit,
            async_getRecord
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
        // 获取签到的习惯的图文
        async_getRecord({
            userId,
            habitId
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
            setTimeout(() => {
                store_recordData({
                    data: {
                        type: '-',
                        key: 'personalRecord',
                        recordList: []
                    }
                })
            }, 200)
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
        async_issueRecord({
            text,
            files,
            userId,
            habitId
        })
        this.state.bookWay === "record" ? (
            this.setState({
                bookWay: "simple"
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
                    {/* <span>签到</span> */}
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
            personalRecord,
            isHaveDate
        } = this.props.record;
        let detail = '';

        // 这个是可以运行的
        if (personalRecord && personalRecord.length > 0) {
            detail = personalRecord.map((item, index) => {
                return (
                    <Detail key={item._id} item={item} />
                )
            })
        }
        let loading = () => {
            if (isHaveDate === '0') {
                return (<div style={{ textAlign: 'center' }}>暂无图文</div>)
            }
            return (<div style={{ textAlign: 'center' }}><Icon type='loading' /></div>)
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
                <div className={`${style.wrap}`}>
                    {this.renderBook(this.state.bookWay, bookHabit)}
                </div>
                <div className={`${style.book_wrap}`}>
                    {detail ? detail : loading()}
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