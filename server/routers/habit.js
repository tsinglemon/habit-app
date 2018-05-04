


const express = require('express');

// 设置存储上传文件名和路径的配置
const multer  = require('multer')
// const upload = multer({dest:'static/upload/'})
const multerConfig = {
    // https://segmentfault.com/a/1190000004636572
    // 文档写得不清不楚的，该链接让我知道了fileFilter应该写在哪里，怎样起作用，
    storage: multer.diskStorage({
        destination: (req,file,cb)=>{
            cb(null,'static/upload/')
        },
        filename:(req,file,cb)=>{
            cb(null,req.body.userId+'-'+Date.now()+file.originalname)
        }
    }),
    fileFilter: (req,file,cb)=>{
        // 允许上传
        cb(null,true)
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



// 搜索习惯
router.get('/search', (req, res) => {
    let habitName = req.query.habitName;
    if (!habitName) res.json({ code: 2, msg: "字符不能为空" });

    habit_all.find({
        habitName
    }, (err, msg) => {
        if (err) return;
        if (!msg[0]) {
            res.json({
                code: 1,
                msg: "没有该习惯，是否创建？"
            })
        } else {
            res.json({ code: 0, msg })
        }
    })
})
// 创建新习惯
router.get('/create', (req, res) => {
    let habitName = req.query.habitName;
    let userId = req.query.userId;

    habit_all.findOne({
        habitName
    }, (err, msg) => {
        if (err) return;
        if (!msg) {
            habit_all.create({
                habitName,
                userCount: 1,
                thum: "/images/default_habit.jpg"
            }, (err, msg) => {
                habitId = msg._id;

                user_info.update({
                    user: userId
                }, {
                        $push: {
                            "habits": [{
                                habit: habitId,
                                createDate: new Date()
                            }]
                        }
                    }, (err, msg) => {
                        res.json({
                            code: 0,
                            msg
                        })
                    })

            })
        } else {
            res.json({
                code: 1,
                msg: "习惯已存在"
            })
        }
    })
})

router.get('/get',(req,res)=>{
    let userId = req.query.userId;
    user_info.find({
        user: userId,
    }).
    populate({
        path: "habits.habit" 
    }).
    populate({
        path: "user"
    }).
    exec((err,msg)=>{
        res.json(msg)
    })
})


// 添加个人习惯
router.get('/add', (req, res) => {

    let habitId = req.query.habitId;
    let userId = req.query.userId;
    user_info.findOne({
        user: userId,
        "habits.habit": habitId
    }, (err, msg) => {
        if (msg) {
            res.json({
                code: 1,
                msg: "您已添加该习惯"
            })
        } else {
            user_info.update({
                user: userId
            },{
                $push: {
                    "habits": [{
                        habit: habitId,
                        createDate: new Date(),
                        count:0
                    }]
                }
            }, (err, msg) => {
                res.json({
                    code: 0,
                    msg
                })
            })
        }


    })
})
// 删除个人里的习惯
router.get('/del', (req, res) => {

    let habitId = req.query.habitId;
    let userId = req.query.userId;
    user_info.findOne({
        user: userId,
        "habits.habit": habitId
    }, (err, msg) => {
        if (msg===null) {
            res.json({
                code: 1,
                msg: "您还没添加该习惯"
            })
        } else {
            user_info.update({
                user: userId
            },{
                $pull: {
                    "habits": {
                        habit: habitId
                    }
                }
            }, (err, msg) => {
                res.json({
                    code: 0,
                    msg
                })
            })
        }
    })
})

// 签到
router.get('/clockIn',(req,res)=>{
    let habitId = req.query.habitId;
    let userId = req.query.userId;

    user_info.update({
        user: userId,
        "habits": {
            // `$elemMatch专门用于查询数组Field中元素是否满足指定的条件。
            $elemMatch:{
                habit:habitId
            }
        }
    },{
        // 修改数组里某个对象的某个属性值，且不引起_id的变化
        $inc: {
            "habits.$.count":+1
        },
        $set: {
            "habits.$.lastDate": new Date()
        }
    },(err,msg)=>{
        res.json(msg)
    })
})

// 发布图文记录
router.post('/record',imageUpload.array('recordImage'),(req,res)=>{

    let habitId = req.body.habitId;
    let userId = req.body.userId;
    let text = req.body.text;
    // let url = req.file.path.replace(/static\\/,"").replace("\\","/");
    let urls = []
    req.files.map((item,index)=>{
        let url = item.path.replace(/static\\/,"").replace("\\","/");
        return urls.push(url);
    })

    habit_record.create({
        user:userId, 
        habit: habitId,
        image:urls,
        text,
        likes: [],
        likeCount: 0,
        comment: []
    },(err,msg)=>{
        res.json(msg)
    })
})


















module.exports = router