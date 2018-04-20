import React,{Component} from "react";

import { Link, Route, BrowserRouter,Switch } from 'react-router-dom'
import Zujian3 from "./zujian3.jsx"
import Zujian1 from "./zujian1.jsx"
export default class extends Component{
    constructor(props){
        super(props)
        console.log(props)
    }
    render() {
        console.log(this.props.match)
        return(
            //  <BrowserRouter>
                <div>
                    <Link to={`${this.props.match.path}/a`}>跳a</Link>
                    <Switch>
                        <Route exact path={`${this.props.match.path}/a`} component={Zujian3} />
                    </Switch>
                </div>
            // </BrowserRouter> 
        )
    }
}