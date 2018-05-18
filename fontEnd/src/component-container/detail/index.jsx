/**
 * 图文记录卡片组件
 */

import React, { Component } from "react";
import style from './detail.css';
import Detail_head from './detail_head.jsx';
import Detail_body from './detail_body.jsx';
import Detail_footer from './detail_footer.jsx';

export default class extends Component {
    render(){
        return(
            <div className={`${style.detail_wrap}`}>
                <Detail_head/>
                <Detail_body/>
                <Detail_footer/>
            </div>
        )
    }
}