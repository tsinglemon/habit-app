

const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const app = express();

// 连接数据库
const db = require('../models/db.js')
const user_security = require('../models/user_security.js')
const user_info = require('../models/user_info.js')

// 用于加密签名的变量
app.set('superSecret', "superSecret");

router.post('/checkUserName', (req, res) => {
    let userName = req.body.userName;
    if (!userName || / /g.test(userName)) {
        res.json({
            userNameTip: "用户名不能有空格",
            isRegisterName: false
        })
        return
    }

    user_security.findOne({ userName }, (err, msg) => {
        if (msg) {
            res.json({
                userName,
                userNameTip: "该用户已注册",
                isRegisterName: false
            });
        } else {
            res.json({
                userName,
                userNameTip: "该用户可以注册",
                isRegisterName: true
            });
        }
    })
})
router.post('/register', (req, res) => {
    let userName = req.body.userName;
    let password = req.body.password;
    let twoPassword = req.body.twoPassword;
    let token = "";
    if (password !== twoPassword ||
        / /g.test(password + twoPassword)) {
        res.json({
            passwordTip: "两次密码不一致",
            isPassword: false
        })
        return;
    }
    if (!userName || / /g.test(userName)) {
        res.json({
            userNameTip: "用户名不能有空格",
            isRegisterName: false
        })
        return
    }
    user_security.findOne({ userName }, (err, msg) => {
        if (msg) {
            res.json({
                userName,
                userNameTip: "该用户已注册",
                isRegisterName: false
            });
        } else {
            // 新建用户
            token = jwt.sign({ userName, password }, app.get('superSecret'), {
                expiresIn: 60 * 60 * 24
            });
            user_security.create({ userName, password, token }, (err, msg) => {
                let userId = msg._id;
                user_info.create({
                    user: msg._id,
                    headPic: "/images/default_head.jpg",
                    attitude: "世界很美！"
                }, (err, msg) => {
                    res.json({
                        userId: userId,
                        isLogin: true,
                        token
                    })
                })
            })
        }
    })
})

router.post('/login', (req, res) => {
    let userName = req.body.userName;
    let password = req.body.password;
    let token = ""
    user_security.findOne({ userName }, (err, msg) => {
        if (!msg) {
            res.json({ userName, userNameTip: "该用户未注册", isRegisterName: false });
        } else if (msg.password !== password) {
            res.json({ passwordTip: "密码错误", isPassword: false });
        } else {
            token = jwt.sign({ userName, password }, app.get("superSecret"), {
                expiresIn: 60 * 60 * 24
            });
            let userId = msg._id;
            // 登录成功后 更新token
            user_security.update({ userName }, { token }, function (err, msg) {
                res.json({
                    token,
                    userId,
                    isLogin: true
                })
            })
        }
    })
})
router.post('/islogin', (req, res) => {
    let token = req.body.token;
    user_security.findOne({
        token
    }, (err, msg) => {
        if (!msg) {
            res.json({
                isLogin: false
            });
            return;
        }
        jwt.verify(token, app.get('superSecret'), function (err, decoded) {
            if (err) {
                res.json({
                    isLogin: false
                });
            } else {
                user_security.findOne({
                    userName: decoded.userName,
                    password: decoded.password
                }, (err, msg) => {
                    if (err || !msg) {
                        res.json({
                            isLogin: false,
                        })
                    } else {
                        res.json({
                            isLogin: true,
                            token,
                            userId: msg._id
                        })
                    }
                })
            }
        });
    })
})

// 修改密码
// router.post('/changePassword', (req, res) => {
//     let userName = req.body.userName;
//     let oldPassword = req.body.oldPassword;
//     let newPassword = req.body.newPassword;
//     let token = ""
//     user_security.findOne({ userName }, (err, msg) => {
//         if (!msg) {
//             res.json({ userName, msg: "该用户未注册", code: 0 });
//         } else if (msg.password !== oldPassword) {
//             res.json({ msg: "旧密码错误", code: 0 });
//         } else {
//             token = jwt.sign({ userName, password: newPassword }, app.get("superSecret"), {
//                 expiresIn: 60 * 60 * 24
//             });
//             // 登录成功后 更新token
//             user_security.update({ userName }, { token, password: newPassword }, function (err, msg) {
//                 res.json({
//                     token: token,
//                     code: 5,
//                     msg: "密码修改成功"
//                 })
//             })
//         }
//     })
// })

module.exports = router;

// jwt.verify(token, app.get('superSecret'), function (err, decoded) {
//     if (err) {
//         return res.json({ success: false, message: '无效的token.' });
//     } else {
//         res.json({ msg: "登录成功", code: 0 })
//     }
// });

