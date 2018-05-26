

import React, { Component } from "react";
import { List } from 'antd-mobile';
import { Link, Route, BrowserRouter, withRouter } from 'react-router-dom';
import { NavBar, Icon, SearchBar, Button } from 'antd-mobile';

import style from './add-habit.css';

class AddHabit extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
        console.log(this.props)
        this.forward = this.forward.bind(this);
        this.goBack = this.goBack.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    componentDidMount() {
        this.autoFocusInst.focus();
    }
    forward(e) {
        this.props.history.push(e);
    }
    goBack(val) {
        this.props.history.goBack()
    }
    onChange(val){
        console.log(val)
        // 变化一次 搜索一次，
        // 如果搜到值就显示，如果没有相关习惯就显示创建按钮
        // 如果值为空就显示默认习惯
        // 
    }

    render() {
        return (
            <div  className={`addHabit`}>
                <div className={`${style.wrap} searchBar`}>
                    <Icon className={`${style.back}`} type="left" color="#fff"
                        onClick={this.goBack}
                    />
                    <SearchBar className={`${style.bar}`}
                        ref={ref => this.autoFocusInst = ref}
                        showCancelButton={false}
                        onCancel={() => {
                            document.querySelector(".am-search-clear").click()
                            document.querySelector(".am-search-value").blur()
                        }}
                        onChange={(val)=>{this.onChange(val)}}
                    />

                </div>
                {/* 创建 */}
                <List>
                    <List.Item
                        extra={ 
                            <Button 
                            type="primary" 
                            size="small" 
                            className={`${style.addBtn}`}
                            activeClassName={`${style.active}`}
                             >创建</Button>
                         }
                        multipleLine
                        onClick={() => {console.log("创建") }}
                    >
                         { <div className={`${style.habitName}`}>吃晚餐</div> }
                        <List.Item.Brief className={`${style.joinCount}`}>未创建</List.Item.Brief>

                    </List.Item>
                </List>
                {/* 加入 */}
                <List>
                    <List.Item
                        extra={ 
                            <Button 
                            type="primary" 
                            size="small" 
                            className={`${style.addBtn}`}
                            activeClassName={`${style.active}`}
                             >加入</Button>
                         }
                        multipleLine
                        onClick={() => { console.log("加入")}}
                    >
                         { <div className={`${style.habitName}`}>吃早餐</div> }
                        <List.Item.Brief className={`${style.joinCount}`}>1000人参与</List.Item.Brief>

                    </List.Item>
                </List>
            </div>
        )
    }
}
// const habit = withRouter( AddHabit )
export { AddHabit }