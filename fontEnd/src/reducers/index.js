/**
 * 把子规则合并成规则集，并导出。
 */


// 使用redux的规则合并方法
import {combineReducers} from 'redux';

// 引入子规则
import userinfo from './userinfo';
// 合并子规则
const rootReducer = combineReducers({
    userinfo
});
// 导出规则集合
export default rootReducer;