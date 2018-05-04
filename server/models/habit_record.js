



const mongoose = require('mongoose');
const db = require('./db.js');
const Schema = mongoose.Schema;

// 习惯的图文信息
const option = {
    user: {
        type: Schema.Types.ObjectId,
        ref: "user_security"
    },
    habit: {
        type: Schema.Types.ObjectId,
        ref: "habit_all"
    },
    image: [String],
    text: String,
    time: {
        type: Date,
        default: Date.now
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: "user_security"
    }],
    likeCount: Number,
    comment: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: "user_security"
        },
        content: String
    }]
}
const collectionName = "habit_record";
const habit_record = db.model(collectionName, new Schema(option), collectionName);

module.exports = habit_record;