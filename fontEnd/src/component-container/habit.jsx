
import React, { Component } from "react";
import { List } from 'antd-mobile';
import { Link, Route, BrowserRouter, Switch, withRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { NavBar, Icon } from 'antd-mobile';

class Habit extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
        this.forward = this.forward.bind(this);
    }
    componentDidMount(){
       
    }
    forward(e){
        this.props.history.push(e);
    }

    render() {
        return (
            <div>
                <NavBar
                    mode="light"
                    rightContent={<div className="iconfont icon-add"
                    onClick={(e)=>{ this.forward("/habit/add") }}
                    ></div>}
                > 我的习惯</NavBar>
                <List className="per-habit-list">
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
        )
    }
}
const habit = withRouter( Habit )
export default habit;