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
        imags: [
            "https://i0download.pchome.net/g1/M00/0E/13/ooYBAFUCPj-IGWmVAASUv9_xNlkAACVvgJd8VwABJTX206.jpg"
        ],
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
        const {
            imags,
            index,
            isOpen
        } = this.state;

        return (
            <div className={`${style.body_wrap}`}>
                <div className={`${style.body_img}`}>
                    {
                        this.state.imags.map((item, index) => {
                            return <div className="img" key={item}>
                                <img src={item} alt="" onClick={this.openViewer.bind(this, index)} width="100%" height="auto" />
                            </div>
                        })
                    }
                </div>
                {
                    isOpen ? <WxImageViewer onClose={this.onClose} urls={this.state.imags} index={index} /> : ""
                }
                <p className={`${style.body_description}`}>
                    我的第一条朋友圈我的第一条朋友圈我的第一条朋友圈我的第一条朋友圈我的第一条朋友圈我的第一条朋友圈~~~~
                </p>
            </div>
        )
    }
}