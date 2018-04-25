


/**
 * 用户账号信息
 */
const mongoose = require('mongoose');
const db = require('./db.js')
const Schema = mongoose.Schema;

var option = {
    name: String,
    habits: Array
}
const user_info = db.model("user_info",new Schema(option))

module.exports = user_info;






















/**
 * 注册的习惯，
 * 显示的时候从习惯表读取详情信息
 */

 /**
习惯的表
{
    habitName: 早起,
    userCount: 100,
    thum: "http://localhost:3008/img/zaoqi.png",
    
}

个人习惯信息
{
    userName: "张三",
    manner: "类似个性签名",
    habits: [
        {
            habitName:"早起",
            startDate: "20180423"
            lastDate: "20180424",
            thum: "http://localhost:3008/img/zaoqi.png",
        }
    ],

}

{
    userName:"张三"
    habitName: "早起",
}

图文记录
{
    userName:"张三",
    habitName: "早起",
    photo: "http://localhost:3008/img/photo.png",
    text: "文字记录",
    likes: ["李四","李二"],
    comment: 
}


  */