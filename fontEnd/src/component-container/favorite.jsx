
import React, { Component } from "react";
import { List, NavBar, Icon } from 'antd-mobile';
import Detail from './detail/index.jsx';

class Favorite extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }
    componentDidMount(){
       
    }

    render() {
        return (
            <div>
                <NavBar
                    mode="light"
                >
            我的收藏
                </NavBar>
                <div className="favorite_wrap">
                    <Detail />
                    <Detail />
                    <Detail />
                </div>

            </div>
        )
    }
}

export { Favorite }