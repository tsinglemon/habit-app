import React,{Component} from "react";
import { renderRoutes } from 'react-router-config';

const Zujian2 = class Zujian2 extends Component{
    constructor(props){
        super(props)
        console.log(props)
    }
    componentWillMount(){
        console.log("将要加载组件3")
    }
    render() {
        return(
            <div>
            组件 moren
            {/* {renderRoutes(this.props.route.routes)} */}
            </div>
        )
    }
}
const Zujian3 = class Zujian3 extends Component{
    constructor(props){
        super(props)
        console.log(props)
    }
    componentWillMount(){
        console.log("将要加载组件3")
    }
    render() {
        return(
            <div>
            组件3
            {/* {renderRoutes(this.props.route.routes)} */}
            </div>
        )
    }
}

export {Zujian2,Zujian3}