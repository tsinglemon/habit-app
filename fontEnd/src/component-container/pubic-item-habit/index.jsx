
import React, { Component } from "react";
import { Link, Redirect } from 'react-router-dom';
import { NavBar, Icon, Button } from 'antd-mobile';
import WxImageViewer from 'react-wx-images-viewer';
import Detail from '../detail/index.jsx';
import style from './itemHabit.css';

class ItemRecords extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            index: 0
        };
        this.goBack = this.goBack.bind(this);
        this.openViewer = this.openViewer.bind(this);
        this.replace = this.replace.bind(this);
    }
    onClose = () => {
        this.setState({
            isOpen: false
        })
    }
    openViewer(fs, index) {
        this.setState({
            index,
            isOpen: true
        })
    }
    goBack(val) {
        this.props.history.goBack()
    }
    replace(val){
        this.props.history.replace(val)
    }

    render() {
        return (
            <div>
                <NavBar
                    mode="light"
                    leftContent={<Icon type="left" />}
                    onLeftClick={this.goBack}
                    // rightContent={  }
                >
                    画画
                </NavBar>
                {/* 判断用户有没有这个习惯，如果有就显示画画社区，如果没有就在右侧增加“加入”按钮 */}
                <div className={`${style.wrap}`}>
                    <h3 className={`${style.header}`}>画画社区</h3>
                    <Button
                        type="primary"
                        className={`${style.add}`}
                        activeClassName={`${style.active}`}
                        onClick={(e)=>{ this.replace('/habit') }}
                        >加入</Button>
                </div>
                <div className={`${style.book_wrap}`}>
                    <Detail />
                    <Detail />
                    <Detail />
                </div>
            </div>
        )
    }
}

export { ItemRecords }