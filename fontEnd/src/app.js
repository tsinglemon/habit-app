
// 代码保存，浏览器局部刷新的关键代码，
// 没这代码，代码保存后浏览器会全部刷新！！
// 一般放在入口文件
// 好东西！！很赞！！！
if (module.hot) { module.hot.accept(); }

import React, { Component } from "react";
import ReactDom from "react-dom";
import { Link, Route, BrowserRouter, Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';


import luyous from './luyou.js'



ReactDom.render(
    <div>
        <BrowserRouter>
            <div>
                <Link to="/">组件1 </Link>
                <Link to="/2">组件2 </Link>
                <Link to="/3">组件3</Link>
                {renderRoutes(luyous)}
            </div>
        </BrowserRouter>
    </div>,
    document.getElementById('root')
);