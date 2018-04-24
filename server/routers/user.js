

const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const app = express();

// 连接students数据库
const db = require('../models/db.js')
const user_security = require('../models/user-security.js')
const user_info = require('../models/user-info.js')

// 用于加密签名的变量
app.set('superSecret', "superSecret");

router.post('/register', (req, res) => {
    let name = req.body.name;
    let password = req.body.password;
    let token = "";

    user_security.findOne({ name }, (err, msg) => {
        if (msg) {
            res.json({
                name,
                msg: "该用户已注册",
                code: 1
            });
        } else {
            // 新建用户
            token = jwt.sign({ msg }, app.get('superSecret'), {
                expiresIn: 60 * 60 * 24
            });
            user_security.create({name, password, token }, (err, msg) => {
                res.json({
                    msg: "注册成功！",
                    code: 0,
                    token
                })
            })  
        }
    })
})

router.post('/login', (req, res) => {
    let name = req.body.name;
    let password = req.body.password;
    let token = ""
    user_security.findOne({ name }, (err, msg) => {
        if (!msg) {
            res.json({ name, msg: "该用户未注册", code: 1 });
        } else if (msg.password !== password) {
            res.json({ msg: "密码错误", code: 2 });
        } else {
            token = jwt.sign({ name,password }, app.get("superSecret"), {
                expiresIn: 60 * 60 * 24
            });
            // 登录成功后 更新token
            user_security.update({ name }, { token }, function (err, msg) {
                res.json({
                    token: token,
                    code: 0,
                    msg: "登陆成功"
                })
            })
        }
    })
})

router.post('/changePassword', (req, res) => {
    let name = req.body.name;
    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;
    let token = ""
    user_security.findOne({ name }, (err, msg) => {
        if (!msg) {
            res.json({ name, msg: "该用户未注册", code: 1 });
        } else if (msg.password !== oldPassword) {
            res.json({ msg: "旧密码错误", code: 2 });
        } else {
            token = jwt.sign({ name,password:newPassword }, app.get("superSecret"), {
                expiresIn: 60 * 60 * 24
            });
            // 登录成功后 更新token
            user_security.update({ name }, { token, password:newPassword }, function (err, msg) {
                res.json({
                    token: token,
                    code: 0,
                    msg: "密码修改成功"
                })
            })
        }
    })
})

module.exports = router;

// jwt.verify(token, app.get('superSecret'), function (err, decoded) {
//     if (err) {
//         return res.json({ success: false, message: '无效的token.' });
//     } else {
//         res.json({ msg: "登录成功", code: 0 })
//     }
// });
