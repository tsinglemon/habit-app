
import {res} from '../constants/index.js'

// 设置默认的状态
const initialState={};
export default (state=initialState,action)=>{
    switch(action.type){
        case res.RES_REGISTER:
            


            return action.data
            break;
        default:
            return state
    }
}