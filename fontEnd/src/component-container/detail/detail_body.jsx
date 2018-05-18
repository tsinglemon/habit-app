/**
 * 图文记录卡片 - 中间部分
 */

import React, { Component } from "react";

import style from './detail.css';

export default class extends Component {
    render() {
        return (
            <div className={`${style.body_wrap}`}>
                <div className={`${style.body_img}`}>
                    <img src="https://i0download.pchome.net/g1/M00/0E/13/ooYBAFUCPj-IGWmVAASUv9_xNlkAACVvgJd8VwABJTX206.jpg" alt=""/>
                </div>
                <p className={`${style.body_description}`}>
                我的第一条朋友圈我的第一条朋友圈我的第一条朋友圈我的第一条朋友圈我的第一条朋友圈我的第一条朋友圈~~~~
                </p>
            </div>
        )
    }
}