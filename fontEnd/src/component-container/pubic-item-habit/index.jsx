
import React, { Component } from "react";
import { Link, Redirect, withRouter } from 'react-router-dom';
import { NavBar, Icon, Button } from 'antd-mobile';
import WxImageViewer from 'react-wx-images-viewer';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { res } from '../../constants/index.js';
import allAction from '../../action/index.js';


import Detail from '../detail/index.jsx';
import style from './itemHabit.css';

class itemRecords extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            index: 0
        };
        this.goBack = this.goBack.bind(this);
        this.openViewer = this.openViewer.bind(this);
        this.replace = this.replace.bind(this);
    }
    componentDidMount(){
        let token = window.localStorage.getItem("token")
        this.props.allAction.req_isLogin({ token })
    }
    componentDidUpdate() {
        console.log(this.props.userinfo.data)
        if (this.props.userinfo.data) {
            if (this.props.userinfo.data.code === 0) {
                this.props.history.replace('/entry')
            } else {
                console.log("已登录")
            }
        }
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
    replace(val){
        this.props.history.replace(val)
    }

    render() {
        return (
            <div>
                <NavBar
                    mode="light"
                    leftContent={<Icon type="left" />}
                    onLeftClick={this.goBack}
                    // rightContent={  }
                >
                    画画
                </NavBar>
                {/* 判断用户有没有这个习惯，如果有就显示画画社区，如果没有就在右侧增加“加入”按钮 */}
                <div className={`${style.wrap}`}>
                    <h3 className={`${style.header}`}>画画社区</h3>
                    <Button
                        type="primary"
                        className={`${style.add}`}
                        activeClassName={`${style.active}`}
                        onClick={(e)=>{ this.replace('/habit') }}
                        >加入</Button>
                </div>
                <div className={`${style.book_wrap}`}>
                    <Detail />
                    <Detail />
                    <Detail />
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
const itemRecords_withRouter = withRouter(itemRecords)
const ItemRecords = connect(
    mapStateToProps,
    mapDispatchToProps
)(itemRecords_withRouter)
export { ItemRecords }