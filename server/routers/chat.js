


const express = require('express');
const socket_io = require('socket.io');

// 设置存储上传文件名和路径的配置
const multer = require('multer')
const multerConfig = {
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'static/chat/')
        },
        filename: (req, file, cb) => {
            cb(null, req.body.userId + '-' + Date.now() + file.originalname)
        }
    }),
    fileFilter: (req, file, cb) => {
        // 允许上传
        cb(null, true)
        // 不允许上传
        // cb(null,false)
    },
    // 一些过滤配置
    limits: {
        // 限制文件大小不能超过5M，单位字节。
        // fileSize: 5242880
    }
}

const imageUpload = multer(multerConfig)
const router = express.Router();
// 连接students数据库
const db = require('../models/db.js')
const user_security = require('../models/user_security.js' );


router.prepareSocketIO = function (server) {
    var io = socket_io(server);
    io.on('connection', function (socket) {
        socket.emit('client',socket.id)

        console.log("成功连接客户端"+socket)

        // socket.on('join', function (user) {
        //     socket.user = user;
        //     socket.emit('state', 'SERVER', true);
        //     socket.broadcast.emit('state', 'SERVER', user + '上线了');
        // });
        // socket.on('sendMSG', function (msg) {
        //     socket.emit('chat', socket.user, msg);
        //     socket.broadcast.emit('chat', socket.user, msg);
        // });

    });

};

module.exports = router;
