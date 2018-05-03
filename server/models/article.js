const mongoose = require('mongoose');
const db = require('./db.js')
const Schema = mongoose.Schema;


// const comments = require('../models/comments.js')
// 文章，引入评论表
const option = {
    title: String,
    content: [String],
    guanlian: [{
        // type: String,
        type: Schema.Types.ObjectId,
        ref: 'comments'
    }],
    like: [{
        // type: String,
        type: Schema.Types.ObjectId,
        ref: 'like'
    }]
}

// 坑爹之旅：https://blog.csdn.net/azureternite/article/details/52349114
// mongose会自作聪明帮你加 “s”，
// 它的蛋！
const collectionName = "article";
const article = db.model(collectionName,new Schema(option),collectionName);

module.exports = article;