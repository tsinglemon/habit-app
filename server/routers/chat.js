


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
const user_security = require('../models/user_security.js');


router.prepareSocketIO = function (server) {
    // https://www.cnblogs.com/lxxhome/p/5980615.html
    // https://www.w3cschool.cn/socket/socket-k49j2eia.html
    var io = socket_io(server, {
        // path要让客户端和服务端都要相同才能成功连接
        // path: '/abc'
    });

    // 通过中间件可以获取客户端url中的参数，记得next
    // 在connection事件里也可以通过socket.handshake.query来获取
    // io.use((socket, next) => {
    //     let token = socket.handshake.query.token;
    //     if (token) {
    //         console.log(token)
    //         return next()
    //     }
    // })
    /**
     * 一条图文记录的评论属于一个房间，房间号是图文的id，对应的socket键就是用户的id
     * 由于每次上线socketId都不一样，所以当用户离线后就从房间离开，并且把对应的socketId清空；
     */
    let rooms = []
    let users = {}
    io.sockets.on('connection', (socket) => {
        console.log("成功连接客户端")
        socket.on('disconnect', (socket) => {
            console.log('断开连接')
        })

        // 给每个连接进来的用户建立socket映射
        socket.on('init',(msg)=>{
            
            users[msg] = socket;
            console.log(msg)
        })
        
        


        // console.log(socket.request.headers.referer)
        let url = socket.request.headers.referer;
        let roomName = url.split('/chat/room/')[1]
        
        if(rooms.indexOf(roomName)===-1){
            rooms.push(roomName)
        }

        socket.join(roomName)
        
        // io.in(roomName).emit('j',rooms)

        socket.on('message',(msg)=>{
            users[msg].emit('chat',"给"+msg+"捎了句话")
            // io.in(msg).emit('j',"我在这个房间说话："+msg)
            
        })
    });
};

module.exports = router;


