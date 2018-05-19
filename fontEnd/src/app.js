

import React,{Component} from 'react';
import ReactDom from "react-dom";
import './static/fonts/iconfont.css';
import './static/stylesheet/index.css';
import './static/stylesheet/normal.css';
import m from  './components/mkh.css';

ReactDom.render(
    <div className={`iconfont icon-search ${m.abc}`}>
        <h1>展示图片</h1>
        <img src={require(`./static/images/timg.jpg`)}/>
    </div>,
    document.getElementById("root")
)

