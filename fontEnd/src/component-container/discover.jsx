
import React, { Component } from "react";
import { Tabs, Badge, List, Card } from 'antd-mobile';
import Detail from './detail/index.jsx';


class Discover extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const tabs = [
            { title: <Badge text={''} overflowCount={20}>热门</Badge> },
            { title: <Badge text={30} overflowCount={20}>关注</Badge> },
            { title: <Badge text={''} overflowCount={20}>最新</Badge> },
        ];
        return (
            <div className="tabHeight">
                <div className="habitTop">
                    <div className="habitTop_right iconfont icon-search"></div>
                </div>
                <Tabs tabs={tabs}>
                    <div style={{margin:"10px"}}>
                        <Detail/>
                    </div>
                    <div>关注</div>
                    <div>最新</div>
                </Tabs>
            </div>
        )
    }
}

export { Discover }