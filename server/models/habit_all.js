



const mongoose = require('mongoose');
const db = require('./db.js');
const Schema = mongoose.Schema;

// 所有习惯
const option = {
    habitName: String,
    userCount: Number,
    thum: String
}
const collectionName = "habit_all";
const habit_all = db.model(collectionName,new Schema(option),collectionName);

module.exports = habit_all;