



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
    // 点赞的人
    praise: [{
        type: Schema.Types.ObjectId,
        ref: "user_security"
    }],
    praiseCount: Number,
    comment: [{
        // otherUser: {
        //     type: Schema.Types.ObjectId,
        //     ref: "user_security"
        // },
        otherUserComment: {},
        user: {
            type: Schema.Types.ObjectId,
            ref: "user_security"
        },
        content: String,
        time: {
            type: Date,
            default: Date.now
        }
    }],
    commentCount: Number
}
const collectionName = "habit_record";
const habit_record = db.model(collectionName, new Schema(option), collectionName);

module.exports = habit_record;