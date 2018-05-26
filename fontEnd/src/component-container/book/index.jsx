
import React, { Component } from "react";
import { Popover, NavBar, Icon, TextareaItem, ImagePicker, Button } from 'antd-mobile';
import WxImageViewer from 'react-wx-images-viewer';
import Detail from '../detail/index.jsx';
import style from './book.css';
const Item = Popover.Item;

const myImg = src => <img src={`https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`} className="am-icon am-icon-xs" alt="" />;

class Book extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            selected: '',
            isBook: false,
            files: [],
            viewFile: [],
            isOpen: false,
            index: 0,
            bookWay: "simple"
        };
        this.handleVisibleChange = this.handleVisibleChange.bind(this)
        this.onSelect = this.onSelect.bind(this)
        this.goBack = this.goBack.bind(this);
        this.openViewer = this.openViewer.bind(this)
    }

    onChange = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
            files
        });
    }

    onClose = () => {
        this.setState({
            isOpen: false
        })
    }

    openViewer(fs, index) {
        let viewFile = []
        viewFile = fs.map((e, i) => {
            return e.url
        })
        this.setState({
            index,
            isOpen: true,
            viewFile
        })

    }
    onSelect(opt, index) {
        switch(opt.props.value){
            case "del": (
                this.goBack("del")
            )
        }
    };
    handleVisibleChange(visible) {
        this.setState({
            visible,
        });
    };
    goBack(val) {
        if(val!=="del"){
            this.state.bookWay==="record"?(
                this.setState({
                    bookWay:"simple"
                })
            ):this.props.history.goBack()
        }else{
            this.props.history.goBack()
        }
        
    }
    renderBook(value) {
        let simple = (
            <div className={`${style.simple}`}>
                <div className={`${style.rotate} ${this.state.isBook ? style.active : ""}`}
                    onClick={() => {
                        this.setState({
                            isBook: !this.state.isBook
                        })
                    }}
                >
                    <div className={`${style.front}`}>签到</div>
                    <div className={`${style.back}`}>已签到</div>
                </div>
                <div className={`${style.createRecord}`}
                    onClick={() => {
                        this.state.isBook ? (
                            this.setState({
                                bookWay: "record"
                            })
                        ) : ""
                    }}
                ><span className={`${this.state.isBook ? style.active : ""}`}>记录一下<i className={`iconfont icon-post`} /></span></div>
            </div>
        )
        let record = (
            <div className={`${style.record}`}>
                <TextareaItem
                    rows={3}
                    count={140}
                />
                <div className={`${style.btn}`}>
                    {/* <span>签到</span> */}
                    <Button
                        type="primary"
                        className={`${style.qiandao}`}
                        activeClassName={`${style.active}`}
                        onClick={(e)=>{ this.goBack() }}
                        >发布</Button>
                    <ImagePicker
                        files={this.state.files}
                        onChange={this.onChange}
                        onImageClick={(index, fs) => { this.openViewer(fs, index) }}
                        selectable={this.state.files.length < 1}
                        multiple={false}
                    />
                    {this.state.isOpen ? <WxImageViewer
                        onClose={this.onClose}
                        urls={this.state.viewFile}
                        index={this.state.index} /> : ""}
                </div>
            </div>
        )

        switch (value) {
            case "simple": return simple; break;
            case "record": return record; break;
            default: return simple;
        }
    }

    render() {
        return (
            <div>
                <NavBar
                    mode="light"
                    leftContent={<Icon type="left" />}
                    rightContent={
                        <Popover
                            mask
                            overlayClassName="fortest"
                            overlayStyle={{ color: 'currentColor' }}
                            visible={this.state.visible}
                            overlay={[
                                (<Item key="1" value="del">退出该习惯</Item>)
                            ]}
                            align={{
                                overflow: { adjustY: 0, adjustX: 0 },
                                offset: [-10, 0],
                            }}
                            onVisibleChange={this.handleVisibleChange}
                            onSelect={(opt, index) => { this.onSelect(opt, index) }}
                        >
                            <div style={{
                                height: '100%',
                                padding: '0 15px',
                                marginRight: '-15px',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                            >
                                <Icon type="ellipsis" />
                            </div>
                        </Popover>

                    }
                    onLeftClick={this.goBack}
                >
                    画画
          </NavBar>

                <div className={`${style.wrap}`}>
                    {this.renderBook(this.state.bookWay)}
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

export { Book }