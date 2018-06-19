/**
 * 图文记录卡片组件
 */

import React, { Component } from "react";
import ReactDOM from 'react-dom';
import style from './detail.css';
import Detail_head from './detail_head.jsx';
import Detail_body from './detail_body.jsx';
import Detail_footer from './detail_footer.jsx';

import { PullToRefresh, Button } from 'antd-mobile';

export default class extends Component {
    render(){
        let {
            item
        } = this.props;
        if (!item) return (<div></div>)

        return(
            <div className={`${style.detail_wrap}`}>
                <Detail_head item={item} />
                <Detail_body item={item}/>
                <Detail_footer item={item}/>
            </div>
        )
    }
}