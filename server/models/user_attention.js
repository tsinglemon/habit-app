



const mongoose = require('mongoose');
const db = require('./db.js');
const Schema = mongoose.Schema;

// 关注关系表
const option = {
    user: {
        type: Schema.Types.ObjectId,
        ref: "user_security"
    },
    attention: {
        type: Schema.Types.ObjectId,
        ref: "user_security"
    },
    state: {
        isLike: Boolean,
        mutual: Boolean
    }
}
const collectionName = "user_attention";
const user_attention = db.model(collectionName,new Schema(option),collectionName);

module.exports = user_attention;