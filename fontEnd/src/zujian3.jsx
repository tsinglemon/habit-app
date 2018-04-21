import React,{Component} from "react";
import { renderRoutes } from 'react-router-config';

console.log(888)

export class Zujian extends Component{
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