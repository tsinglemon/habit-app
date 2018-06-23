


const express = require('express');
const socket_io = require('socket.io');
const router = express.Router();

const db = require('../models/db.js')
const user_habit = require('../models/user_habit.js')


router.prepareSocketIO = function (server) {
    // https://www.cnblogs.com/lxxhome/p/5980615.html
    // https://www.w3cschool.cn/socket/socket-k49j2eia.html
    var io = socket_io(server, {});

    // 计算倒计时
    function computationTime() {
        let now = new Date();
        let year = now.getFullYear(),
            month = now.getMonth(),
            date = now.getDate()
        let oneDay = 24 * 60 * 60 * 1000;
        // 当天零点的时间+一整天的时间
        let allDayTime = new Date(year, month, date).getTime() + oneDay;
        // 起点时间
        let startTime = new Date().getTime();
        // 剩余重置状态的时间
        let countDown = allDayTime - startTime
        return countDown
    }
    // 执行习惯状态重置
    this.reBook = function () {
        setTimeout(() => {
            user_habit.updateMany({}, {
                $set: {
                    "isClockIn": false
                }
            }, (err, msg) => {
                if (!this.socket) return;
                this.socket.send({
                    reBook: true
                })
            })
            this.reBook()
        }, computationTime())
    }
    this.reBook()

    io.sockets.on('connection', (socket) => {
        this.socket = socket
        // 去数据库重置所有习惯的钱都状态
        // 给客户端发送重置状态
    });
};

module.exports = router;


