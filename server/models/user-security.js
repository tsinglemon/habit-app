


/**
 * 用户安全信息
 */
const mongoose = require('mongoose');
const db = require('./db.js')
const Schema = mongoose.Schema;

var option = {
    name: String,
    password: String,
    token:String
}

const user_security = db.model("user_security",new Schema(option))

module.exports = user_security;