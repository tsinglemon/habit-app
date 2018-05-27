

import { takeEvery, takeLatest } from 'redux-saga';
import { call, put,take } from 'redux-saga/effects';
import axios from "axios";

import {req,res} from '../constants/index.js'
import allAction from '../action/index.js';

function* yibu(data){
    try{

        
        yield put(allAction.get_register({user: "saga put的数据"}));
    }catch(e){
        console.log(e)
    }
    
}

export function* habitSaga() {
    console.log("进入了")
    yield* takeLatest(req.REQ_CHECK_USER_NAME, yibu)
}