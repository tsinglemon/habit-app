
const mongoose = require('mongoose');

var db = mongoose.createConnection('mongodb://127.0.0.1:27017/habit'); 

db.once('open',function(err){
    console.log('habit数据库连接成功！')
})

module.exports = db;