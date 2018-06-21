


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
    author: {
        type: Schema.Types.ObjectId,
        ref: "user_security"
    },
    recordId: {
        type: Schema.Types.ObjectId,
        ref: "habit_record"
    }
}
const collectionName = "user_collect";
const user_collect = db.model(collectionName, new Schema(option), collectionName)

module.exports = user_collect;



