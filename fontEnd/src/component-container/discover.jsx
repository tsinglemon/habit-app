
import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { Tabs, Badge, List, Card, PullToRefresh, Icon } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import WxImageViewer from 'react-wx-images-viewer';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as actionMethod from '../action/index.js';

import Detail from './detail/index.jsx';


class discover extends Component {
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
    }
    componentDidUpdate() {
        let {
            tempRecord,
            isHaveDate
        } = this.props.record;
        if (tempRecord && tempRecord.length <= 0 && isHaveDate === '1') {
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
            async_getRecord,
            // store_recordData
        } = this.props.actionMethod;
        let {
            tempRecord,
            lastRecord: lastId,
            tabIndex
        } = this.props.record;

        let userId = window.localStorage.getItem("userId");
        let lastRecord = tempRecord.length > 0 ? lastId : ''

        if (tabIndex === 1) {
            async_getRecord({
                userId,
                lastRecord,
                type: 'getNewRecord'
            })
        } else if (tabIndex === 0) {
            async_getRecord({
                userId,
                lastRecord,
                type: 'getHotRecord'
            })
        } else {

        }


    }
    onTab(index) {
        let {
            store_recordData
        } = this.props.actionMethod;
        if (index !== undefined) {
            setTimeout(() => {
                store_recordData({
                    data: {
                        type: '-',
                        isHaveDate: '1',
                        recordList: [],
                        tabIndex:index
                    }
                })
            }, 0)
        }
    }

    render() {
        let {
            tempRecord,
            isHaveDate
        } = this.props.record;
        let {
            tabIndex
        } = this.props.record;
        let detail = '';

        if (tempRecord && tempRecord.length > 0) {
            detail = tempRecord.map((item, index) => {
                return (
                    <Detail key={item._id} item={item} />
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

        const tabs = [
            { title: <Badge text={''} overflowCount={20}>热门</Badge> },
            // { title: <Badge text={30} overflowCount={20}>关注</Badge> },
            { title: <Badge text={''} overflowCount={20}>最新</Badge> },
        ];

        return (
            <div className="tabHeight">
                <Tabs
                    tabs={tabs}
                    useOnPan={false}
                    onChange={(tab, index) => {
                        this.onTab(index)
                    }}
                    page={tabIndex}
                >
                    <div style={{ margin: "10px" }}>
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
                            <div>
                                {detail ? detail : loading()}
                            </div>
                        </PullToRefresh>
                    </div>
                    <div style={{ margin: "10px" }}>
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
                            <div>
                                {detail ? detail : loading()}
                            </div>
                        </PullToRefresh>
                    </div>
                </Tabs>
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
const discover_withRouter = withRouter(discover)
const Discover = connect(
    mapStateToProps,
    mapDispatchToProps
)(discover_withRouter)
export { Discover }