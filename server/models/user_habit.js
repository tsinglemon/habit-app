


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
    habit: {
        type: Schema.Types.ObjectId,
        ref: "habit_all"
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    lastDate: {
        type: Date,
        default: Date.now
    },
    date: [{
        type: Date,
        default: Date.now
    }],
    count: {
        type: Number,
        default: 0
    },
    isClockIn: {
        type: Boolean,
        default: false
    }
}
const collectionName = "user_habit";
const user_habit = db.model(collectionName, new Schema(option), collectionName)

module.exports = user_habit;



