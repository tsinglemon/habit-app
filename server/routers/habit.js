


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


// 获取个人加入的习惯
router.get('/getHabits', (req, res) => {
    let userId = req.query.userId;
    user_info.findOne({
        user: userId
    }).populate({
        path: "habits.habit"
    }).exec((err, msg) => {
        res.json({
            habitList: msg
        })
    })
})

// 搜索习惯
router.get('/search', (req, res) => {
    let habitName = req.query.habitName;
    let userId = req.query.userId;
    let page = req.query.page;
    // let reg = new RegExp('^'+habitName+'$','i');
    let reg = new RegExp(habitName, 'i');

    if (!habitName) {
        res.json({
            searchResult: [],
            isUpdate: false
        })
        return;
    }

    habit_all.find({
        habitName: {
            $regex: reg
        }
    },
        null,
        (err, allHabit) => {
            if (err) return;

            user_info.findOne({
                user: userId
            }).populate({
                path: "habits.habit"
            }).exec((err, msg) => {
                // 确保习惯是唯一的
                habit_all.findOne({
                    habitName
                }, (err, oneResult) => {
                    // 获取已经加入的习惯
                    let myHabits = msg.habits.map((item, i) => {
                        return {
                            habitName: item.habit.habitName,
                            stateName: '已加入',
                        }
                    })
                    // 把精确匹配的结果搬到列表最上面，如果没有精确匹配的结果就按数据库读取顺序显示
                    let topResult = allHabit.find((item) => {
                        return item.habitName === habitName
                    })
                    let topIndex = allHabit.findIndex((item) => {
                        return item.habitName === habitName
                    })
                    if (topIndex !== -1) {
                        allHabit.splice(topIndex, 1)
                        allHabit.unshift(topResult);
                    }
                    // 初始化搜索出来的结果
                    let searchHaibts = allHabit.map((item, i) => {
                        return {
                            habitId: item._id,
                            thum: item.thum,
                            habitName: item.habitName,
                            userCount: item.userCount,
                            stateName: '加入',
                        }
                    })
                    // 合并搜索出的习惯和自己已加入的习惯
                    searchResult = searchHaibts.map((item, index) => {
                        let update = myHabits.find(
                            (el) => {
                                return el.habitName === item.habitName
                            });
                        return update ? { ...item, ...update } : item
                    })
                    // 把未创建的习惯搬到结果的最上面
                    if (!oneResult && habitName !== '') {
                        searchResult.unshift({
                            userCount: '未创建',
                            stateName: '创建',
                            habitName
                        })
                    }

                    res.json({
                        searchResult,
                        isUpdate: false
                    })
                })
            })
            return;
        })
})
// 创建新习惯
router.get('/createHabit', (req, res) => {
    let habitName = req.query.habitName;
    let userId = req.query.userId;

    habit_all.findOne({
        habitName
    }, (err, msg) => {
        if (err) {
            res.json(err)
            return;
        }

        if (!msg) {
            habit_all.create({
                habitName,
                userCount: 1,
                thum: "/images/default_habit.jpg"
            }, (err, msg) => {
                let {
                    _id: habitId,
                    userCount
                } = msg

                user_info.update({
                    user: userId
                }, {
                        $push: {
                            "habits": [{
                                habit: habitId,
                                createDate: new Date(),
                                count: 0,
                                isClockIn: false
                            }]
                        }
                    }, (err, msg) => {
                        res.json({
                            searchResult: [
                                {
                                    habitName,
                                    userCount,
                                    stateName: '已加入'
                                }
                            ],
                            isUpdate: true
                        })
                    })
            })
        } else {
            res.json({
                code: 10,
                msg: "习惯已存在"
            })
        }
    })
})

// populate的使用
// router.get('/get', (req, res) => {
//     let userId = req.query.userId;
//     user_info.find({
//         user: userId,
//     }).
//         populate({
//             path: "habits.habit"
//         }).
//         populate({
//             path: "user"
//         }).
//         exec((err, msg) => {
//             res.json(msg)
//         })
// })


// 添加个人习惯
router.get('/addHabit', (req, res) => {

    let habitId = req.query.habitId;
    let userId = req.query.userId;
    user_info.findOne({
        user: userId,
        "habits.habit": habitId
    }, (err, msg) => {
        if (msg) {
            res.json({
                code: 10,
                msg: "您已添加该习惯"
            })
        } else {
            user_info.update({
                user: userId
            }, {
                    $push: {
                        "habits": [{
                            habit: habitId,
                            createDate: new Date(),
                            count: 0,
                            isClockIn: false
                        }]
                    }
                }, (err) => {
                    habit_all.findOneAndUpdate({
                        _id: habitId
                    }, {
                            $inc: {
                                "userCount": +1
                            }
                        }, {
                            new: true
                        }, (err, msg) => {
                            res.json({
                                searchResult: [
                                    {
                                        habitId: msg._id,
                                        userCount: msg.userCount,
                                        stateName: '已加入'
                                    }
                                ],
                                isUpdate: true
                            })
                        })
                })
        }
    })
})
// 删除个人的习惯
router.get('/delHabit', (req, res) => {

    let habitId = req.query.habitId;
    let userId = req.query.userId;

    user_info.findOne({
        user: userId,
        "habits.habit": habitId
    }, (err, msg) => {
        if (!msg) {
            res.json({
                code: 10,
                msg: "您还没添加该习惯"
            })
        } else {
            user_info.update({
                user: userId
            }, {
                    $pull: {
                        "habits": {
                            habit: habitId
                        }
                    }
                }, (err, msg) => {
                    habit_all.findOneAndUpdate({
                        _id: habitId
                    }, {
                            $inc: {
                                "userCount": -1
                            }
                        }, (err, msg) => {
                            res.json({
                                habitList: [
                                    {
                                        habitId
                                    }
                                ],
                                isUpdate: true
                            })
                        })
                })
        }
    })
})

// 签到
router.get('/clockIn', (req, res) => {
    let habitId = req.query.habitId;
    let userId = req.query.userId;

    user_info.find({
        user: userId,
        "habits.habit": habitId
    }, "habits.$", (err, msg) => {

        if (msg[0].habits[0].isClockIn) {
            res.json({ msg: "已签到" })
        } else {
            user_info.update({
                user: userId,
                "habits": {
                    // `$elemMatch专门用于查询数组Field中元素是否满足指定的条件。
                    $elemMatch: {
                        habit: habitId
                    }
                }
            }, {
                    // 修改数组里某个对象的某个属性值，且不引起_id的变化
                    $inc: {
                        "habits.$.count": +1
                    },
                    $set: {
                        "habits.$.lastDate": new Date(),
                        "habits.$.isClockIn": true
                    },
                    $push: {
                        "habits.$.date": Date.now()
                    }
                }, (err, msg) => {
                    res.json(msg)
                })
        }
    })
})

// 发布图文记录
router.post('/record', imageUpload.array('recordImage'), (req, res) => {

    let habitId = req.body.habitId;
    let userId = req.body.userId;
    let text = req.body.text;

    let urls = []
    req.files.map((item, index) => {
        let url = item.path.replace(/static\\/, "").replace("\\", "/");
        return urls.push(url);
    })

    habit_record.create({
        user: userId,
        habit: habitId,
        image: urls,
        text,
        praise: [],
        praiseCount: 0,
        comment: [],
        commentCount: 0
    }, (err, msg) => {
        res.json(msg)
    })
})

// 删除图文记录
router.get('/delRecord', (req, res) => {

    let userId = req.query.userId;
    let recordId = req.query.recordId;

    habit_record.remove({
        user: userId,
        _id: recordId
    }, (err, msg) => {
        res.json(msg)
    })
})

// 查找图文记录
router.get('/getRecord', (req, res) => {

    let userId = req.query.userId;
    let recordId = req.query.recordId;
    /**
     * 这里可以根据用户、习惯、日期来进行分别查询
     */
    // habit_record.find({
    //     user: userId,
    //     _id: recordId
    // }, (err, msg) => {
    //     res.json(msg)
    // })
})

// 点赞
router.get('/like', (req, res) => {
    let userId = req.query.userId;
    let recordId = req.query.recordId;

    habit_record.findOne({
        _id: recordId,
        praise: userId
    }, (err, msg) => {
        if (msg) {
            console.log(recordId)
            habit_record.update({ _id: recordId },
                {
                    $pull: {
                        praise: userId
                    },
                    $inc: {
                        praiseCount: -1
                    }
                }, (err, msg) => {
                    // 取消用户点赞过的图文
                    user_info.update({ user: userId }, {
                        $pull: {
                            collect: recordId
                        }
                    }, (err, msg) => {
                        res.json("按理应该删了")
                    })
                })
        } else {
            habit_record.update({ _id: recordId },
                {
                    $push: {
                        praise: [userId]
                    },
                    $inc: {
                        praiseCount: +1
                    }
                }, (err, msg) => {
                    // 记录用户点赞过的图文
                    user_info.update({ user: userId }, {
                        $push: {
                            collect: [recordId]
                        }
                    }, (err, msg) => {
                        res.json("按理应该赞了")
                    })
                })
        }
    })
})

// 评论/回复
router.get('/comment', (req, res) => {
    let userId = req.query.userId;
    let otherUserId = req.query.otherUserId;
    let recordId = req.query.recordId;
    let content = req.query.content;

    if (!otherUserId) {
        // 评论
        habit_record.update({ _id: recordId }, {
            $push: {
                comment: [{
                    user: userId,
                    content,
                }]
            },
            $inc: {
                commentCount: +1
            }
        }, (err, msg) => {
            res.json(msg)
        })
    } else {
        // 回复
        habit_record.update({ _id: recordId }, {
            $push: {
                comment: [{
                    otherUser: otherUserId,
                    user: userId,
                    content,
                }]
            },
            $inc: {
                commentCount: +1
            }
        }, (err, msg) => {
            res.json(msg)
        })
    }
})

// 删除评论/回复
router.get('/delComment', (req, res) => {
    let userId = req.query.userId;
    let recordId = req.query.recordId;
    let commentId = req.query.commentId;

    habit_record.update({
        _id: recordId,
        // comment: {
        //     // 匹配数组中的哪一条，
        //     $elemMatch: {
        //         user: userId
        //     }
        // }
    }, {
            // $set: {
            //     // 匹配那一条要修改的属性
            //     "comment.$.content": "llllllll"
            // }

            // 删除某条评论/回复
            $pull: {
                "comment": {
                    _id: commentId,
                    user: userId
                }
            },
            $inc: {
                commentCount: -1
            }
        }, (err, msg) => {
            res.json(msg)
        })
})

// 初始数据
router.get('/init', (req, res) => {

    // let habitId = "5aedc78687cfad73641f347e";
    let habitId = "5aedc7a087cfad73641f3480";
    let userId = "5aede8a202f25993ec1902f2";

    // 根据最后更新的时间判断是否需要重置该习惯的签到状态
    user_info.find({
        user: userId,
        "habits.habit": habitId
    }, "habits.$", (err, msg) => {

        let lastDate = msg[0].habits[0].lastDate
        let now = new Date()
        let year = now.getFullYear(),
            month = now.getMonth(),
            date = now.getDate()
        let today = new Date(year, month, date)

        let dis = today.getTime() + 0 - lastDate.getTime() + 0;
        if (dis < 0) {
            res.json("已重置签到状态")
        } else {
            user_info.update({
                user: userId,
                "habits": {
                    // `$elemMatch专门用于查询数组Field中元素是否满足指定的条件。
                    $elemMatch: {
                        habit: habitId
                    }
                }
            }, {
                    // 修改数组里某个对象的某个属性值，且不引起_id的变化
                    $set: {
                        "habits.$.isClockIn": false
                    }
                }, (err, msg) => {
                    res.json(msg)
                })
            res.json("重置签到状态")
        }
        res.json(msg[0].habits[0])
    })
})

// 关注
/**
 * 先查一下关注的人有没有关注过自己，如果没有 就先看看自己有没有文档，如果有就修改，没有就创建
 * 如果对方有创建过，就记录对方的isLike作为相互关注的依据，然后同样先判断自己有没有文档，如果有就修改，没有就创建
 */
router.get('/attention', (req, res) => {
    let userId = req.query.userId
    let attentionId = req.query.attention

    user_attention.findOne({
        user: attentionId,
        attention: userId
    }, (err, msg) => {
        // 如果对方从来没有关注你
        if (!msg) {
            user_attention.findOne({
                user: userId,
                attention: attentionId
            }, (err, msg) => {
                if (msg) {
                    let selfIsLike = !msg.state.isLike;
                    user_attention.update({
                        user: userId,
                        attention: attentionId
                    }, {
                            $set: {
                                "state.isLike": selfIsLike
                            }
                        }, (err, msg) => {
                            res.json({
                                msg: selfIsLike ? "成功关注" : "取消关注"
                            })
                        })
                } else {
                    user_attention.create({
                        user: userId,
                        attention: attentionId,
                        "state.isLike": true,
                        "state.mutual": false,
                    }, (err, msg) => {
                        res.json({
                            msg: "成功关注"
                        })
                    })
                }
            })
        }
        // 如果对方曾经或现在关注过你
        else {
            let otherLike = msg.state.isLike
            user_attention.findOne({
                user: userId,
                attention: attentionId
            }, (err, msg) => {
                // 如果已经存在自己的关注记录
                if (msg) {
                    let selfIsLike = !msg.state.isLike;
                    user_attention.update({
                        user: userId,
                        attention: attentionId
                    }, {
                            $set: {
                                "state.isLike": selfIsLike
                            }
                        }, (err, msg) => { })

                    // 修改自己的相互关注状态
                    user_attention.update({
                        user: userId,
                        attention: attentionId
                    }, {
                            $set: {
                                "state.mutual": otherLike && selfIsLike
                            }
                        }, (err, msg) => { })

                    // 修改对方的相互关注状态
                    user_attention.update({
                        user: attentionId,
                        attention: userId
                    }, {
                            $set: {
                                "state.mutual": otherLike && selfIsLike
                            }
                        }, (err, msg) => {
                            res.json({
                                msg: selfIsLike ? "相互关注成功" : "取消关注成功"
                            })
                        })

                } else {
                    user_attention.create({
                        user: userId,
                        attention: attentionId,
                        "state.isLike": true,
                        "state.mutual": otherLike,
                    }, (err, msg) => {
                        res.json({
                            msg: "成功关注"
                        })
                    })
                }
            })
        }
    })
})

// 获取已关注
router.get('/getFans', (req, res) => {
    // let userId = req.query.userId;
    // let attentionId = req.query.attentionId;

    let userId = "5aede8a202f25993ec1902f2"
    let attention = "5aede517d145309110b2bf55"
    user_attention.find({
        attention: userId,
        // "state.isLike":true
    }, (err, msg) => {
        res.json(msg)
    })
})
// 查看别人的关注列表，除了返回他关注的人，还需要返回关注的人跟自己的关注关系
router.get('/getOtherList', (req, res) => {
    // let userId = req.query.userId;
    // let attentionId = req.query.attentionId;

    let otherId = "5aede8a202f25993ec1902f2"
    let myId = "5aede6ee522ac98d08e34063"

    let result = [];
    let obj = {}
    user_attention.find({
        user: otherId
    }, (err, msg) => {
        let msgLength = msg.length;

        // 找出对方关注列表的人，然后返回这些人跟自己的关系和其他相关数据
        msg.map((item, index) => {
            let otherAttention = item.attention;
            user_attention.findOne({
                user: myId,
                attention: otherAttention
            }, (err, msg) => {
                if (msg) {
                    obj = {
                        user: myId,
                        attention: otherAttention,
                        state: msg.state
                    }
                }
                // 如果没有这条文档，那肯定没有关注过，也就不可能会有互粉这些
                else {
                    obj = {
                        user: myId,
                        attention: otherAttention,
                        state: { isLike: false, mutual: false }
                    }
                }
                result.push(obj);
                // 没有用propmis，简单粗暴用这个解决异步查询
                if (index >= msgLength - 1) {
                    res.json(result)
                }
            })
        })
    })
})












module.exports = router