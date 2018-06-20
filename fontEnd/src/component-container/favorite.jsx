
import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import { List, NavBar, Icon, PullToRefresh } from 'antd-mobile';
import Detail from './detail/index.jsx';
import WxImageViewer from 'react-wx-images-viewer';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as actionMethod from '../action/index.js';

class favorite extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            index: 0,
            refreshing: false,
            height: document.documentElement.clientHeight,
        }
    }
    componentDidMount() {
        const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
        setTimeout(() => this.setState({
            height: hei
        }), 0);
        this.getRecord()
    }
    componentWillUpdate() {
        let {
            tempRecord,
            isHaveDate
        } = this.props.record;
        if (tempRecord && tempRecord.length <= 0 && isHaveDate === '1') {
            console.log(tempRecord)
            this.getRecord()
        }
    }
    componentWillUnmount() {
        let {
            store_recordData
        } = this.props.actionMethod;
        setTimeout(() => {
            store_recordData({
                data: {
                    type: '-',
                    isHaveDate: '1',
                    recordList: []
                }
            })
        }, 0)
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

    getRecord() {
        let {
            async_getRecord
        } = this.props.actionMethod;
        let {
            tempRecord,
            lastRecord:lastId
        } = this.props.record;
        let userId = window.localStorage.getItem("userId");
        let lastRecord = tempRecord.length > 0 ? lastId : ''

        async_getRecord({
            userId,
            lastRecord,
            type: 'myCollect'
        })
    }
    render() {
        
        let {
            match
        } = this.props;
        console.log(this.props)
        let {
            tempRecord,
            isHaveDate
        } = this.props.record;
        let detail = '';

        if (tempRecord && tempRecord.length > 0) {
            detail = tempRecord.map((item, index) => {
                return (
                    <Detail key={item._id} item={item} match={match} />
                )
            })
        }
        let loading = () => {
            if (isHaveDate === '0') {
                return (<div style={{ textAlign: 'center' }}>暂无图文</div>)
            } else {
                return (<div style={{ textAlign: 'center' }}><Icon type='loading' /></div>)
            }
        }



        return (
            <div>
                <NavBar
                    mode="light"
                >
                    我的收藏
                </NavBar>

                <div>
                    <PullToRefresh
                        damping={60}
                        ref={el => this.ptr = el}
                        style={{
                            height: this.state.height,
                            overflow: 'auto',
                        }}
                        indicator={{ deactivate: '上拉可以刷新' }}
                        direction={'up'}
                        refreshing={this.state.refreshing}
                        onRefresh={() => {
                            this.getRecord()
                        }}
                    >
                        <div className="favorite_wrap">
                            {detail ? detail : loading()}
                        </div>
                    </PullToRefresh>
                </div>

            </div>
        )
    }
}


const mapStateToProps = (state) => {
    let {
        record
    } = state;
    return { record };
}
const mapDispatchToProps = (dispath) => {
    return {
        actionMethod: bindActionCreators(actionMethod, dispath)
    }
}
const favorite_withRouter = withRouter(favorite)
const Favorite = connect(
    mapStateToProps,
    mapDispatchToProps
)(favorite_withRouter)
export { Favorite }