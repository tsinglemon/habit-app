const createError = require('http-errors');
const express = require('express');
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'static')));

const apis = require('./routers/index.js');
app.use('/api',apis)



// 其余接口返回index.html页面，让前端来处理页面跳转
app.use(function (req, res) {
    fs.readFile(__dirname + '/index.html', function (err, data) {
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
