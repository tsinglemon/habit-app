


/**
 * 用户账号信息
 */
const mongoose = require('mongoose');
const db = require('./db.js')
const Schema = mongoose.Schema;

var option = {
    name: String
}
const user_info = db.model("user_info",new Schema(option))

module.exports = user_info;