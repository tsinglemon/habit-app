/**
 * 图文记录卡片 - 底部
 */

import React, { Component } from "react";
import { Modal, InputItem, List } from 'antd-mobile';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as actionMethod from '../../action/index.js';

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

const mapStateToProps = (state) => {
    let {
        record
    } = state
    return { record };
}
const mapDispatchToProps = (dispath) => {
    return {
        actionMethod: bindActionCreators(actionMethod, dispath)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    class extends Component {
        constructor(props) {
            super(props)
            this.state = {
                modal: false,
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

        // 评论otherUser, commentId
        sendValue(comment) {
            let {
                async_comment,
                async_delComment
            } = this.props.actionMethod;
            let {
                item
            } = this.props;

            let userId = window.localStorage.getItem('userId');
            let otherUserId = comment&&comment.user?comment.user._id:'';
            let otherUserComment = comment?comment:'';
            
            let recordId = item._id;
            let content = this.autoFocusInst.inputRef.props.value;

            if (comment === undefined) {
                async_comment({
                    userId,
                    otherUserId,
                    otherUserComment,
                    recordId,
                    content
                })
                this.autoFocusInst.clearInput();
            } else if (userId ===comment.user._id) {
                // 如果otherUser是自己就删除；
                Modal.operation([
                    {
                        text: `删除该评论？`,
                        onPress: () => {
                            async_delComment({
                                userId,
                                recordId,
                                commentId:comment._id
                            })
                        }
                    }
                ])
            }
        }


        // 点赞
        onPraise() {
            let {
                item
            } = this.props;
            let {
                async_praise
            } = this.props.actionMethod;
            let userId = window.localStorage.getItem("userId");

            async_praise({
                userId,
                recordId: item._id
            })
        }
        delRecord() {
            let {
                item
            } = this.props;
            let {
                async_delRecord
            } = this.props.actionMethod;
            let userId = window.localStorage.getItem("userId");
            console.log(item._id, userId)
            async_delRecord({
                userId,
                recordId: item._id
            })
        }

        render() {
            let {
                item
            } = this.props;
            let userId = window.localStorage.getItem("userId");
            if (!item) return (<div></div>)

            let isMyPraise = item.praise.find((item) => {
                return item === userId;
            })
            let isAuthor = item.comment.find((comment) => {
                return comment.user._id === item.user._id;
            })
            let comments = item.comment.map((item) => {
                let time = '刚刚';
                let origin_ms = new Date(item.time).getTime();
                let now_ms = new Date().getTime();
                let dis_ms = now_ms - origin_ms;

                if (dis_ms > 86400000) time = `${parseInt(dis_ms / 1000 / 60 / 60 / 24)}天前`;
                if (dis_ms >= 3600000 && dis_ms < 86400000) time = `${parseInt(dis_ms / 1000 / 60 / 60)}小时前`;
                if (dis_ms >= 60000 && dis_ms < 3600000) time = `${parseInt(dis_ms / 1000 / 60)}分钟前`;
                if (dis_ms >= 30000 && dis_ms < 60000) time = `${parseInt(dis_ms / 1000)}秒前`;

                return (
                    <div className={`${style.comment_item}`}
                        key={item._id}
                    >
                        <div className={`${style.comment_pic}`}>
                            <Link to=''>
                                <img src="http://192.168.1.105:3008/images/default_head.jpg" />
                            </Link>
                        </div>
                        <div className={`${style.comment_body}`}
                            onClick={() => { this.sendValue(item) }}
                        >
                            <h3 className={`${style.comment_user}`}>
                                <span className={`${style.comment_userName}`}>{item.user.userName}
                                    <span
                                        style={{ padding: '0 4px', marginLeft: '4px', color: '#fff', background: '#f40', fontSize: '12px', lineHeight: 1 }}
                                    >{isAuthor ? '作者' : ''}</span>
                                </span>
                                <span className={`${style.comment_time}`}>{time}</span>
                            </h3>
                            <div className={`${style.comment_info}`}>
                                {item.content}
                                {
                                    item.otherUserComment && item.otherUserComment.user ? (
                                        <div className={`${style.comment_body}`}>
                                            <h3 className={`${style.comment_user}`}>
                                                <span className={`${style.comment_userName}`}>
                                                    @{item.otherUserComment.user.userName}
                                                </span>
                                            </h3>
                                            <div className={`${style.comment_info}`}> {item.otherUserComment.content}</div>
                                        </div>
                                    ) : ''

                                }

                            </div>
                        </div>
                    </div>
                )
            })


            return (
                <div className={`${style.footer_wrap}`}>

                    <span className={!!isMyPraise ? `iconfont icon-likefill` : `iconfont icon-like`}
                        onClick={() => {
                            this.onPraise()
                        }}
                    ><em className={`${style.footer_item}`}>{item.praiseCount}</em></span>
                    <span className={`iconfont icon-xiaoxi`}
                        onClick={this.showModal('modal')}
                    ><em className={`${style.footer_item}`}>{item.commentCount}</em></span>
                    <span className={`iconfont icon-shanchu`}
                        onClick={() => {

                            Modal.operation([
                                {
                                    text: `确定删除？`,
                                    onPress: () => this.delRecord()
                                }
                            ])

                        }}
                    ></span>

                    <Modal
                        visible={this.state.modal}
                        transparent
                        maskClosable={true}
                        onClose={this.onClose('modal')}
                        className='detail_wrap'
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
                                        ref={ref => this.autoFocusInst = ref}
                                    >
                                        <span className="comment_btn" onClick={
                                            () => { this.sendValue() }
                                        }>GO</span>
                                    </InputItem>
                                </div>)
                        }]
                        }
                        wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                    >
                        <div className={`${style.comment_list}`}>
                            {comments}
                            {/* <div className={`${style.comment_item}`}>
                                <div className={`${style.comment_pic}`}>
                                    <Link to=''>
                                        <img src="http://192.168.1.105:3008/images/default_head.jpg" />
                                    </Link>
                                </div>
                                <div className={`${style.comment_body}`}>
                                    <h3 className={`${style.comment_user}`}>
                                        <span className={`${style.comment_userName}`}>{Canvas}</span>
                                        <span className={`${style.comment_time}`}>21:20</span>
                                    </h3>
                                    <p className={`${style.comment_info}`}>
                                        {}
                                    </p>
                                </div>
                            </div> */}
                            {/* <div className={`${style.comment_item}`}>
                                <div className={`${style.comment_pic}`}>
                                    <Link to=''>
                                        <img src="http://192.168.1.105:3008/images/default_head.jpg" />
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
                            </div> */}
                        </div>
                    </Modal>
                </div>
            )
        }
    }
) 