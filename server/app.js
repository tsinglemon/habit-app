var createError = require('http-errors');
var express = require('express');
var path = require('path');
const fs = require('fs');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const jwt = require('jsonwebtoken');

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'static')));

// 设置全局变量
app.set('superSecret', "superSecret");

const Linshi = require('./models/linshi.js')


/**使用jwt做登录验证 */
/**
 * 生成token，验证并获取token信息，
 * payload支持数组、对象，不支持字符串、数字、布尔值。
 * // http://laravelacademy.org/post/3640.html 
 这里面的前6个字段都是由JWT的标准所定义的。
    sub: 该JWT所面向的用户
    iss: 该JWT的签发者
    iat(issued at): 在什么时候签发的token
    exp(expires): token什么时候过期
    nbf(not before)：token在此时间之前不能被接收处理
    jti：JWT ID为web token提供唯一标识
 */
app.use('/add', function (req, res) {
    Linshi.create({ name: "钟家铭", pw: "abcd" }, (err, msg) => { res.json("注册成功！") })
})
app.use('/login', function (req, res) {
    Linshi.find({ name: "钟家铭", pw: "abcd" }, (err, msg) => {

        // 加密
        let token = jwt.sign({msg}, app.get('superSecret'), {
            expiresIn: 60*60*24 // 授权时效24小时，键名随便起
        });

        // 验证、解密
        jwt.verify(token, app.get('superSecret'), function (err, decoded) {
            if (err) {
                return res.json({ success: false, message: '无效的token.' });
            } else {
                res.json({decoded,token})
            }
        });
        res.json({ token, success: "登录成功！" })
    })
})






// 把所有habit开头的路径都返回index.html页面，让前端来处理页面跳转
app.use("/habit", function (req, res, next) {
    fs.readFile(__dirname + '/src/index.html', function (err, data) {
        if (err) {
            console.log(err);
            res.send('后台错误');
        } else {
            res.writeHead(200, {
                'Content-type': 'text/html',
                'Connection': 'keep-alive'
            });
            res.end(data);
        }
    })
});







// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    fs.readFile(__dirname + '/defaultViews/error.html', function (err, data) {
        if (err) {
            console.log(err);
            res.send('后台错误');
        } else {
            res.writeHead(200, {
                'Content-type': 'text/html',
                'Connection': 'keep-alive'
            });
            res.end(data);
        }
    })
});

module.exports = app;
