/**
 * 图文记录卡片 - 底部
 */

import React, { Component } from "react";
import { Modal, InputItem, List } from 'antd-mobile';
import { Link } from 'react-router-dom';

import style from './detail.css';

function closest(el, selector) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
        if (matchesSelector.call(el, selector)) {
            return el;
        }
        el = el.parentElement;
    }
    return null;
}



export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            comment: ""
        }
        this.changeValue = this.changeValue.bind(this)
        this.sendValue = this.sendValue.bind(this)
    }
    showModal = key => (e) => {
        // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
        });
    }
    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    }

    onWrapTouchStart = (e) => {
        // fix touch to scroll background page on iOS
        if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
            return;
        }
        const pNode = closest(e.target, '.am-modal-content');
        if (!pNode) {
            e.preventDefault();
        }
    }

    changeValue(val) {
        this.setState({
            comment: val
        })
    }
    sendValue() {
        // 提交评论，dispath到saga里处理这个异步
        console.log("提交评论")
        let isEle = document.querySelector('.am-input-clear');
        isEle?isEle.click():"";
        this.setState({
            comment: ""
        })
    }

    render() {
        return (
            <div className={`${style.footer_wrap}`}>

                <span className={`iconfont icon-like`}><em className={`${style.footer_item}`}>0</em></span>
                <span className={`iconfont icon-xiaoxi`}
                    onClick={this.showModal('modal')}
                ><em className={`${style.footer_item}`}>0</em></span>
                <span className={`iconfont icon-shanchu`}></span>

                <Modal
                    visible={this.state.modal}
                    transparent
                    maskClosable={true}
                    onClose={this.onClose('modal')}
                    title={
                        <div className={`${style.comment_title}`}>
                            <span>评论</span>
                            <em
                                className={` iconfont icon-cuowu`}
                                onClick={this.onClose('modal')}
                            ></em>
                        </div>
                    }
                    footer={[{
                        text: (
                            <div className="comment_input">
                                <InputItem 
                                    clear={true}
                                    onChange={this.changeValue}>
                                    <span className="comment_btn" onClick={this.sendValue}>GO</span>
                                </InputItem>
                            </div>)
                    }]
                    }
                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                >
                    <div className={`${style.comment_list}`}>
                        <div className={`${style.comment_item}`}>
                            <div className={`${style.comment_pic}`}>
                                <Link to=''>
                                    <img src="http://192.168.1.101:3008/images/default_head.jpg" />
                                </Link>
                            </div>
                            <div className={`${style.comment_body}`}>
                                <h3 className={`${style.comment_user}`}>
                                    <span className={`${style.comment_userName}`}>Canvas</span>
                                    <span className={`${style.comment_time}`}>21:20</span>
                                </h3>
                                <p className={`${style.comment_info}`}>
                                    评论的实际内容评论的实际内容容评论的实际内容评论的实际内容
                                </p>
                            </div>
                        </div>
                        <div className={`${style.comment_item}`}>
                            <div className={`${style.comment_pic}`}>
                                <Link to=''>
                                    <img src="http://192.168.1.101:3008/images/default_head.jpg" />
                                </Link>
                            </div>
                            <div className={`${style.comment_body}`}>
                                <h3 className={`${style.comment_user}`}>
                                    <span className={`${style.comment_userName}`}>Canvas</span>
                                    <span className={`${style.comment_time}`}>21:20</span>
                                </h3>
                                <p className={`${style.comment_info}`}>
                                    评论的实际内容评论的实际内容容评论的实际内容评论的实际内容
                                </p>

                                <div className={`${style.comment_body}`}>
                                    <h3 className={`${style.comment_user}`}>
                                        <span className={`${style.comment_userName}`}>@Canvas</span>

                                    </h3>
                                    <p className={`${style.comment_info}`}>
                                        评论的实际内容评论的实际内容容评论的实际内容评论的实际内容
                                </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}