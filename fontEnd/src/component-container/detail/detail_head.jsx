/**
 * 图文记录卡片 - 头部
 */

import React, { Component } from "react";
import { Link } from 'react-router-dom';

import style from './detail.css';

export default class extends Component {
    render() {
        let {
            item
        } = this.props;
        if (!item) return (<div></div>)

        let time = '刚刚';
        let origin_ms = new Date(item.time).getTime();
        let now_ms = new Date().getTime();
        let dis_ms = now_ms - origin_ms;

        if (dis_ms > 86400000) time = `${parseInt(dis_ms / 1000 / 60 / 60 / 24)}天前`;
        if (dis_ms >= 3600000 && dis_ms < 86400000) time = `${parseInt(dis_ms / 1000 / 60 / 60)}小时前`;
        if (dis_ms >= 60000 && dis_ms < 3600000) time = `${parseInt(dis_ms / 1000 / 60)}分钟前`;
        if (dis_ms >= 30000 && dis_ms < 60000) time = `${parseInt(dis_ms / 1000)}秒前`;
        

        return (
            <div className={`${style.head_wrap}`}>
                <div className={`${style.head_userInfo}`} >
                    <Link to="/discover" className={`${style.head_pic}`}>
                        <img src="http://192.168.1.105:3008/images/default_head.jpg" alt="" />
                    </Link>
                    <div className={`${style.head_description}`}>
                        <h3 className={`${style.head_userName}`}> {item.user.userName} </h3>
                        <span className={`${style.head_habit}`}>坚持<Link className={`${style.head_habitLink}`} to={`/record/${item.habit._id}/`}>#{item.habit.habitName}#</Link></span>
                    </div>
                </div>
                <div className={`${style.head_date}`}>
                    <span className={`${style.head_time}`}>{time}</span>
                    {/* <span className={`${style.head_day}`}>99天</span> */}
                </div>
            </div>
        )
    }
}