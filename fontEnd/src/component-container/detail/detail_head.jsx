/**
 * 图文记录卡片 - 头部
 */

import React, { Component } from "react";
import { Link } from 'react-router-dom';

import style from './detail.css';

export default class extends Component {
    render() {
        return (
            <div className={`${style.head_wrap}`}>
                <div className={`${style.head_userInfo}`} >
                    <Link to="/discover" className={`${style.head_pic}`}>
                        <img src="http://192.168.1.105:3008/images/default_head.jpg" alt="" />
                    </Link>
                    <div className={`${style.head_description}`}>
                        <h3 className={`${style.head_userName}`}> <Link to="/discover/">Canvas</Link> </h3>
                        <span className={`${style.head_habit}`}>坚持<Link className={`${style.head_habitLink}`} to="/record/0002">#画画#</Link></span>
                    </div>
                </div>
                <div className={`${style.head_date}`}>
                    <span className={`${style.head_time}`}>今天9:00</span>
                    <span className={`${style.head_day}`}>99天</span>
                </div>
            </div>
        )
    }
}