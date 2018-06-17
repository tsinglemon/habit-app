


const express = require('express');

// 设置存储上传文件名和路径的配置
const multer = require('multer')
// const upload = multer({dest:'static/upload/'})
const multerConfig = {
    // https://segmentfault.com/a/1190000004636572
    // 文档写得不清不楚的，该链接让我知道了fileFilter应该写在哪里，怎样起作用，
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'static/upload/')
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
const habit_all = require('../models/habit_all.js')
const habit_record = require('../models/habit_record.js')
const user_info = require('../models/user_info.js')
const user_attention = require('../models/user_attention.js')


const data = require('./house_data.js')

router.get('/house', (req, res) => {
    let type = req.query.filter;

    // 指定排序的比较函数
    function compare(property) {
        return function (obj1, obj2) {
            var value1 = obj1[property];
            var value2 = obj2[property];
            return value1 - value2;     // 升序
        }
    }
    var sortObj = data.sort(compare("id"));

    let lessArr = [];
    let rn = ['01', '02', '03', '04']
    lessArr = sortObj.map((el, i) => {
        if (i < 94) {
            let x = 2;
            x = x + parseInt(i / 4)
            let six = ((x) + rn[i % 4]) < 1000 ? '0' + ((x) + rn[i % 4]) : (x) + rn[i % 4]
            return {
                // "id": el.id,
                "room": '六-' + six,
                "collected": el.collected
            }
        } else {
            let x = 2;
            x = (x + parseInt((i + 6) / 4)) % 25
            let sevent = ((x) + rn[(i + 2) % 4]) < 1000 ? '0' + ((x) + rn[(i + 2) % 4]) : (x) + rn[(i + 2) % 4]
            return {
                // "id": el.id,
                "room": '七-' + sevent,
                "collected": el.collected,
            }
        }
    })
    if (type === "filter") {
        let filterArr = []
        filterArr = lessArr.filter((item) => {
            let fiVal = item.room.substr(item.room.length - 2, 2)
            return fiVal === '01' || fiVal === '02'
        })
        res.json(filterArr)
    } else {
        res.json(lessArr)
    }



})


module.exports = router