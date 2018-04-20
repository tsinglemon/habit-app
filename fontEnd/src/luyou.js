


import { Link, Route, BrowserRouter, Switch } from 'react-router-dom';
import Zujian1 from "./zujian1.jsx"
import Zujian2 from "./zujian2.jsx"
// import Zujian3 from "./zujian3.jsx"


// 使用这个按需加载必须做好babel转换工作，
// 具体怎么配置babel在asyncComponent模块注释里备注了相应参考资料
// 做了按需加载就不要在其他地方单独引入，否则不会打包成chunk
import asyncComponent from "./asyncComponent.js"
const Zujian3 = asyncComponent(() => import(/*webpackChunkName:"zujian3"*/"./zujian3.jsx"));


/**
 * 通常在跟路由设置exact，如果不设置，那每个组件都会显示根路由的组件。
 * react-router-config中的renderRoutes实际是就是用一层Switch和多个Route来包了一层，他可以做到统一管理前端路由，
 * 结合react-router-config的renderRoutes，可以逐层使用嵌套的routes，
 * BrowserRouter这个组件可以在最外层组件上用，也可以在嵌套里面用，
 * 发现的区别是在嵌套里面用BrowserRouter另外包住其他路由的话，
 * 那么外面通过link改变了地址，里面的路由也不受影响，
 * BrowserRouter就像有隔离作用似的。
 * 例子就是本例子中的组件2和组件2里面的link跳转，
 * 当点击外部link时，并没有引起内部路由的变化
 */
export default [
    {
        path:'/',
        exact:true,
        component:Zujian1
    },
    {
        path:'/2',
        component:Zujian2,
        routes:[
            {
                path:'/2/a',
                component:Zujian3,
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
