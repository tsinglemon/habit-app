const mongoose = require('mongoose');
const db = require('./db.js');
const Schema = mongoose.Schema;

// 评论表
const option = {
    user: String,
    comments: String
}
const collectionName = "comments";
const comments = db.model(collectionName,new Schema(option),collectionName);

module.exports = comments;