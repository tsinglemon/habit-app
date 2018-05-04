


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

const collectionName = "user_security";
const user_security = db.model(collectionName,new Schema(option),collectionName)

module.exports = user_security;