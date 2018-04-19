
const mongoose = require('mongoose');

var db = mongoose.createConnection('mongodb://127.0.0.1:27018/habit'); 

db.once('open',function(err){
    console.log('连接成功')
})

module.exports = db;