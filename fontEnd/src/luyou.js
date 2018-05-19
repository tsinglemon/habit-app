


import { Link, Route, BrowserRouter, Switch } from 'react-router-dom';
import Zujian1,{Demo} from "./zujian1.jsx"
import Zujian2 from "./zujian2.jsx"


import {asyncComponent} from "./static/javascript/asyncComponent.js"
const Moren = asyncComponent("Zujian2",() => import(/*webpackChunkName:"zujian2"*/"./zujian3.jsx"));
const Zujian3 = asyncComponent("Zujian3",() => import(/*webpackChunkName:"zujian3"*/"./zujian3.jsx"));

export default [
    {
        path:'/',
        exact:true,
        component:Moren
    },
    {
        path:'/2',
        component:Zujian2,
        routes:[
            {
                path:'/2/a',
                component:Demo,
                routes:[
                    {
                        path:'/2/a/9',
                        component:Zujian1
                    }
                ]
            }
        ]
    },
    {
        path:'/3',
        component:Zujian3
    }
]
