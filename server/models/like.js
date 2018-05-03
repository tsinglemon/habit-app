const mongoose = require('mongoose');
const db = require('./db.js');
const Schema = mongoose.Schema;

// 评论表
const option = {
    likeUser: String,
    arr: [{
        // type: String,
        type: Schema.Types.ObjectId,
        ref: 'comments'
    }],
}
const collectionName = "like";
const like = db.model(collectionName,new Schema(option),collectionName);

module.exports = like;