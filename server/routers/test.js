
const express = require('express');
const router = express.Router();
// 连接students数据库
const db = require('../models/db.js')
const article = require('../models/article.js')
const comments = require('../models/comments.js')
const like = require('../models/like.js')


router.get('/add', (req, res) => {
    comments.create({
        user: "张三",
        comments: "pinglun",
    }, (err, msg) => {

        var commentId = msg.id;
        like.create({
            likeUser: "我是like",
            arr: []
        }, (err, msg) => {

            var likeId = msg.id;


            /**
             * 向集合中指定的数组增加元素
             */
            article.update({
                "guanlian": '5aea8cc9777db58fa44b852e'
            },{
                $push: {
                    "guanlian": '5aea8cbaf35f9d9d34cabac3'
                }
            }, (err, msg) => {
                res.json(msg)
            })

            /**
             * 删除集合中指定的元素
             */
            // article.update({
            //     "guanlian": '5ae9c3b46b6cdf6d04ef6c81'
            // },{
            //     $pull: {
            //         "guanlian": '5ae9c3b46b6cdf6d04ef6c81'
            //     }
            // }, (err, msg) => {
            //     res.json(msg)
            // })

            /* 
            * 修改集合指定数组的元素
            * */
            // article.update({
            //         "guanlian": '5ae9c3b46b6cdf6d04ef6c80'
            // },{$set:{
            //     "guanlian.$": '5ae9c3b46b6cdf6d04ef6c89'
            // }}, (err, msg) => {
            //     res.json(msg)
            // })

            /**
             * 给这个集合添加一条文档，这条文档引用了评论集合和点赞集合
             */
            // article.create({
            //     title: "我是标题",
            //     content: "我是内容",
            //     guanlian: commentId,
            //     like: likeId
            // }, (err, msg) => {
            //     res.json(likeId)
            // })
        })
    })
})
router.get('/get', (req, res) => {
    article.find({ title: "我是标题" }).
        // populate('guanlian','user').
        populate({
            path: 'guanlian',
            select: { comments: 0 },
            // model: "comments"
            options: {
                limit: 2
            }
        }).
        populate({
            path: "like",
        }).
        exec((err, msg) => {
            if (err) throw err;
            res.json(msg)
        })
})

/**
 * 注意了，不能同时有包含和排除的字段， _id 除外
 * 要么全部写要排除的字段，要么相反
 * 当某个字段是包含，默认其他都不包含,
 * 当某个字段是排除，只作用被排除的，其他默认都显示
 * 
 */
// 参考资料： https://www.jianshu.com/p/d700ad062083
// http://mongoosejs.com/docs/populate.html#deep-populate
// https://segmentfault.com/a/1190000002727265#articleHeader1


module.exports = router