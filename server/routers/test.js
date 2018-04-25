
const express = require('express');
const router = express.Router();
// 连接students数据库
const db = require('../models/db.js')
const article = require('../models/article.js')
const comments = require('../models/comments.js')
router.get('/add', (req, res) => {

    comments.create({
        user: "张三",
        comment: "张三的评论",
    }, (err, msg) => {
        article.create({
            title: "我是标题",
            content: "我是内容",
            guanlian: msg._id
        }, (err, msg) => {
            res.json(msg)
        })
    })
})
router.get('/get', (req, res) => {
    article.find({ title: "我是标题" }).
        // populate('guanlian','user').
        populate({
            path: 'guanlian',
            select: { comment: 0 },
            // model: "comments"
            options: {
                limit: 1
            }
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