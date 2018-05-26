
import React, { Component } from "react";
import { Popover, NavBar, Icon, Button, List } from 'antd-mobile';
import { Link, withRouter } from 'react-router-dom';
import style from './myCenter.css';
class mycenter extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }


    render() {
        return (
            <div className={`${style.wrap}`} >
                <div className={`${style.header}`}>
                    <div className={`${style.picWrap}`}>
                        <div className={`${style.pic}`}>
                            <img src="data:image/jpeg;base64,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" />
                        </div>
                        {/* <span className={`${style.gender} ${style.gender_nv} iconfont icon-nvxing`}></span> */}
                        <span className={`${style.gender} ${style.gender_nan} iconfont icon-nan`}></span>
                    </div>

                    <div className={`${style.attention}`}>
                        <Link className={`${style.attention_count}`} to="/my/inserest/inserest"><strong>20</strong><span>关注</span></Link>
                        <Link className={`${style.attention_count}`} to="/my/inserest/fans"><strong>20</strong><span>粉丝</span></Link>
                    </div>
                </div>
                <p className={`${style.introduce}`}>简单介绍自己</p>

                <div className={`${style.otherHabit} otherHabit`}>
                    <h3 className={`${style.title}`}>Ta的习惯记录</h3>

                    <List>
                        <List.Item
                            className="per-habit-item"
                            arrow=""
                            thumb={<div className="iconfont icon-marketing_fill"></div>}
                            multipleLine
                            onClick={() => { }}
                        >
                            <Link to="/habit/book/0001">
                                {<div className="per-habit-name">画画</div>}
                                <List.Item.Brief className="per-habit-brief">subtitle</List.Item.Brief>
                            </Link>
                        </List.Item>
                    </List>
                </div>


                <div className={`${style.message} myCenter`}>
                    <h3 className={`${style.title}`}>通知</h3>
                    <div className={`${style.content}`}>

                        <List className="">
                            <List.Item
                                thumb={<div className={`${style.msg_userPic}`}>
                                    <Link to="">
                                        <img src="http://img2.imgtn.bdimg.com/it/u=1416157376,2250476580&fm=27&gp=0.jpg" alt="" />
                                    </Link>
                                </div>}
                                multipleLine
                            >
                                <Link to="/habit/book/0001" className={`${style.msg_right}`}>
                                    <div className={`${style.msg_item}`}>
                                        <div className={`${style.msg_user}`}>
                                            <span>张三</span>
                                            <span className={`${style.msg_type}`}>评论了你的记录</span>
                                        </div>
                                        <p className={`${style.msg_body}`}>评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论</p>
                                        <List.Item.Brief style={{ fontSize: "12px", margin: "0" }} >12:00</List.Item.Brief>
                                    </div>
                                    <div className={`${style.msg_record}`}>
                                        <img src="http://img2.imgtn.bdimg.com/it/u=2421375767,909320505&fm=27&gp=0.jpg" />
                                    </div>

                                </Link>
                            </List.Item>
                            <List.Item
                                className=""
                                thumb={<div className={`${style.msg_userPic}`}>
                                    <Link to="">
                                        <img src="http://img2.imgtn.bdimg.com/it/u=1416157376,2250476580&fm=27&gp=0.jpg" alt="" />
                                    </Link>
                                </div>}
                                multipleLine
                            >
                                <Link to="/habit/book/0001" className={`${style.msg_right}`}>
                                    <div className={`${style.msg_item}`}>
                                        <div className={`${style.msg_user}`}>
                                            <span>张三</span>
                                            <span className={`${style.msg_type}`}>点赞了你的记录</span>
                                        </div>
                                        <List.Item.Brief style={{ fontSize: "12px", margin: "0" }} >12:00</List.Item.Brief>
                                    </div>
                                    <div className={`${style.msg_record}`}>
                                        <img src="http://img2.imgtn.bdimg.com/it/u=2421375767,909320505&fm=27&gp=0.jpg" />
                                    </div>

                                </Link>
                            </List.Item>
                        </List>
                    </div>
                </div>
            </div>
        )
    }
}
const MyCenter = withRouter(mycenter)
export { MyCenter }