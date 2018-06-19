
import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { NavBar, Icon, Button, PullToRefresh } from 'antd-mobile';
import WxImageViewer from 'react-wx-images-viewer';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as actionMethod from '../../action/index.js';


import Detail from '../detail/index.jsx';
import style from './itemHabit.css';

class itemRecords extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            index: 0,
            refreshing: false,
            height: document.documentElement.clientHeight,
        };
        this.goBack = this.goBack.bind(this);
        this.openViewer = this.openViewer.bind(this);
        this.replace = this.replace.bind(this);
        this.getRecord = this.getRecord.bind(this);
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
        const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
        setTimeout(() => this.setState({
            height: hei
        }), 0);
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
    onClose = () => {
        this.setState({
            isOpen: false
        })
    }
    openViewer(fs, index) {
        this.setState({
            index,
            isOpen: true
        })
    }
    goBack(val) {
        this.props.history.goBack()
    }
    replace(val) {
        this.props.history.replace(val)
    }
    // 获取某个习惯的图文
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
        let lastRecord = tempRecord && tempRecord.length > 0 ? tempRecord[tempRecord.length - 1]._id : ''

        async_getRecord({
            habitId,
            lastRecord
        })
    }

    render() {

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
                    画画
                </NavBar>
                {/* 判断用户有没有这个习惯，如果有就显示画画社区，如果没有就在右侧增加“加入”按钮 */}
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
                            <h3 className={`${style.header}`}>画画社区</h3>
                            <Button
                                type="primary"
                                className={`${style.add}`}
                                activeClassName={`${style.active}`}
                                onClick={(e) => { this.replace('/habit') }}
                            >加入</Button>
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
        record
    } = state
    return { userinfo, record };
}
const mapDispatchToProps = (dispath) => {
    return {
        actionMethod: bindActionCreators(actionMethod, dispath)
    }
}
const itemRecords_withRouter = withRouter(itemRecords)
const ItemRecords = connect(
    mapStateToProps,
    mapDispatchToProps
)(itemRecords_withRouter)
export { ItemRecords }