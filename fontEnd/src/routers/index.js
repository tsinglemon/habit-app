


// import { Link, Route, BrowserRouter, Switch } from 'react-router-dom';
// import { asyncComponent } from "../static/javascript/asyncComponent.js"

import {Wrap} from '../component-container/wrap.jsx';
import { Book } from '../component-container/book/index.jsx';
import  {ItemRecords}  from '../component-container/pubic-item-habit/index.jsx';
import  {AddHabit}  from '../component-container/add-habit/index.jsx';
import  {Interest}  from '../component-container/interest/index.jsx';
import  {Entry}  from '../component-container/entry/index.jsx';



// const Moren = asyncComponent("Zujian2",() => import(/*webpackChunkName:"zujian2"*/"./zujian3.jsx"));
// https://www.jianshu.com/p/e3adc9b5f75c

export default [
    {
        path: '/',
        exact:true,
        component: Wrap
    },
    {
        path: '/entry',
        component: Entry
    },
    {
        path: '/record/:id',
        component: ItemRecords
    },
    {
        path: '/habit/book/:id',
        component: Book,
    },
    {
        path: '/habit/add',
        component: AddHabit
    },
    {
        path: '/habit',
        component: Wrap
    },
    {
        path: '/discover',
        component: Wrap
    },
    {
        path: '/favorite',
        component: Wrap
    },
    {
        path:'/my/inserest/:id',
        component: Interest
    },
    {
        path: '/my',
        component: Wrap
    }
]
