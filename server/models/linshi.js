
const mongoose = require('mongoose');
const db = require('./db.js')
const Schema = mongoose.Schema;

var linshi = {
    name: String,
    pw: String,
    userId:String,
    session:String,
    expires:Date
}
const linshiSchema = new Schema(linshi);

const Linshi = db.model("Linshi",linshiSchema)

module.exports = Linshi;