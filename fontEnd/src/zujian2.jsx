import React,{Component} from "react";

import { Link, Route, BrowserRouter,Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';


export default class extends Component{
    constructor(props){
        super(props)
        console.log(props)
    }
    render() {
        return(
            //  <BrowserRouter>
                <div>
                    <Link to="/2/a">跳a</Link>
                    {renderRoutes(this.props.route.routes)}
                </div>
            //  </BrowserRouter>
        )
    }
}