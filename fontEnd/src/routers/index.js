


import { Link, Route, BrowserRouter, Switch } from 'react-router-dom';
import {asyncComponent} from "../static/javascript/asyncComponent.js"

import Wrap from '../component-container/wrap.jsx';



// const Moren = asyncComponent("Zujian2",() => import(/*webpackChunkName:"zujian2"*/"./zujian3.jsx"));


export default [
    {
        path:'/',
        exact:true,
        component:Wrap
    },
    {
        path:'/habit',
        exact:true,
        component:Wrap
    },
    {
        path:'/discover',
        exact:true,
        component:Wrap
    },
    {
        path:'/message',
        exact:true,
        component:Wrap
    },
    {
        path:'/my',
        exact:true,
        component:Wrap
    },
    // {
    //     path:'/2',
    //     component:Zujian2,
    //     routes:[
    //         {
    //             path:'/2/a',
    //             component:Demo,
    //             routes:[
    //                 {
    //                     path:'/2/a/9',
    //                     component:Zujian1
    //                 }
    //             ]
    //         }
    //     ]
    // },
    // {
    //     path:'/3',
    //     component:Zujian3
    // }
]
