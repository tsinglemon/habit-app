


import React, { Component } from "react";
import ReactDom from "react-dom";
import { Link, Route, BrowserRouter, Switch } from 'react-router-dom'
import Zujian1 from "./zujian1.jsx"
import Zujian2 from "./zujian2.jsx"
import Zujian3 from "./zujian3.jsx"








ReactDom.render(
    <div>
        <BrowserRouter>
            <div>
                <Link to="/1">组件1 </Link>
                <Link to="/2">组件2 </Link>
                <Link to="/3">组件3</Link>
                <Switch>
                    <Route exact path="/" component={Zujian1}></Route>
                    <Route path="/2" component={Zujian2} ></Route>
                    <Route path="/3" component={Zujian3}></Route>
                </Switch>
            </div>
        </BrowserRouter>
    </div>,
    document.getElementById('root')
);