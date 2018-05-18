
import React, { Component } from "react";
import { List } from 'antd-mobile';

class Habit extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <div>
                <div className="habitTop">
                    <div className="habitTop_left">编辑</div>
                    <div className="habitTop_center">习惯</div>
                    <div className="habitTop_right iconfont icon-add"></div>
                </div>
                <List className="per-habit-list">
                    <List.Item
                        className="per-habit-item"
                        arrow=""
                        thumb={<div className="iconfont icon-marketing_fill"></div>}
                        multipleLine
                        onClick={() => { }}
                    >
                        { <div className="per-habit-name">画画</div> }
                        <List.Item.Brief className="per-habit-brief">subtitle</List.Item.Brief>
                    </List.Item>
                </List>
            </div>
        )
    }
}

export { Habit }