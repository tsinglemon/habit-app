/**
 * 图文记录卡片 - 底部
 */

import React, { Component } from "react";
import { Modal, InputItem } from 'antd-mobile';

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
            modal: false
        }
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
                    maskClosable={false}
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
                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                >
                    <div className={`${style.comment_size}`}>
                        评论
                    </div>
                    <div className="comment_input">
                        <InputItem>GO</InputItem>
                    </div>
                </Modal>
            </div>
        )
    }
}