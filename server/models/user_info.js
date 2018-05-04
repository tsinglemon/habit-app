


/**
 * 用户账号信息
 */
const mongoose = require('mongoose');
const db = require('./db.js')
const Schema = mongoose.Schema;

var option = {
    user: {
        type: Schema.Types.ObjectId,
        ref: "user_security"
    },
    headPic: String,
    attitude: String,
    habits: [{
        habit: {
            type: Schema.Types.ObjectId,
            ref: "habit_all"
        },
        createDate:{
            type: Date,
            default: Date.now
        },
        lastDate: {
            type: Date,
            default: Date.now
        },
        count: Number
    }]
}
const collectionName = "user_info";
const user_info = db.model(collectionName, new Schema(option), collectionName)

module.exports = user_info;



