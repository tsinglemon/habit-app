/**
 * 图文记录卡片 - 中间部分
 */

import React, { Component } from "react";
import WxImageViewer from 'react-wx-images-viewer';
import style from './detail.css';

// 图片缩放组件
// https://github.com/react-ld/react-wx-images-viewer/blob/master/README-cn.md#%E4%BD%BF%E7%94%A8
export default class extends Component {
    state = {
        index: 0,
        isOpen: false
    };

    onClose = () => {
        this.setState({
            isOpen: false
        })
    }

    openViewer(index) {
        this.setState({
            index,
            isOpen: true
        })
    }


    render() {
        let {
            index,
            isOpen
        } = this.state;
        let {
            item
        } = this.props;
        if (!item) return (<div></div>)
        return (
            <div className={`${style.body_wrap}`}>
                {item.image.length > 0 ? (<div className={`${style.body_img}`}>
                    {
                        item.image.map((item, index) => {
                            return <div className="img" key={item}>
                                <img src={item} alt="" onClick={this.openViewer.bind(this, index)} width="100%" height="auto" />
                            </div>
                        })
                    }
                </div>) : ''}
                {
                    isOpen ? <WxImageViewer onClose={this.onClose} urls={item.image} index={index} /> : ""
                }
                <p className={`${style.body_description}`}>
                    {item.text}
                </p>
            </div>
        )
    }
}