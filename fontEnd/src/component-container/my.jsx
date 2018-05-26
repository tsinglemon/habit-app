
import React, { Component } from "react";
import { NavBar} from 'antd-mobile';
import { Link,  withRouter  } from 'react-router-dom';
import {MyCenter} from './my-center/index.jsx';
import style from './container.css'

class my extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <div>
                <NavBar
                    mode="light"
                    rightContent={ 
                        // <span className={`${style.btn}`}>关注</span>
                        <span className={`${style.btn} ${style.active}`}>已关注</span>
                    }
                >
                    我的中心
                </NavBar>
                <div style={{marginTop:"44px"}}>
                    <MyCenter/>
                </div>
            </div>
        )
    }
}

const My = withRouter(my)
export { My }