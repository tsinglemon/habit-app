> 该项目暂停维护。

# habit-app
记录习惯培养过程的心得体会
<!-- [项目github地址](https://github.com/tsinglemon/habit-app) -->

## 项目初衷
该项目从创建自己第一个习惯开始，每天一签到，签到后可以发表这一天的心得体会，  这些心得体会会公布在社区，其他用户可以对某一条心得体会进行收藏和评论；旨在通过每天的记录和不断的正向反馈，慢慢培养起跟随自己一生的好习惯；  

## 线上地址
![线上体验](http://tsinglemon.com/images/share.png)

## 技术栈
> 前端  

* react
* react-redux 
* redux-saga
* react-router(v4);  
* [Ant Design Mobile](https://mobile.ant.design/docs/react/introduce-cn)
* webpack
* babel
* postCss


> 后端  

* express
* mongodb

## 快速开始
*假设大家已经安装好[node环境](https://nodejs.org/zh-cn/download/)*

### 运行步骤：
#### 一、 download项目到本地；
#### 二、 分别在`habit-app-master/server`和`habit-app-master/fontEnd`输入命令`npm install`；
#### 三、 在`habit-app-master/server`目录下创建如下文件夹或文件`static/upload`和`data/log/mongodb.log`、`data/db`；
#### 四、 本项目用的是`mongodb`数据库，因此需要安装[MongoDB](https://www.mongodb.com/dr/fastdl.mongodb.org/win32/mongodb-win32-x86_64-2008plus-ssl-3.6.5-signed.msi/download)，由于本地是window，因此选择了window平台的版本；
1. 下载并安装MongoDB后进入`bin`目录，创建文件`mongodb-habit.conf`,输入以下配置
``` 
    dbpath = 本地绝对路径\habit-app-master\server\data\db
    logpath = 本地绝对路径\habit-app-master\server\data\log\mongodb.log
    port=27017
```
2. 在命令行进入`bin`目录，输入`mongod -config ./mongodb-habit.conf` 回车即开启数据库

#### 五、打包前端项目
1. 进入项目的`fontEnd`目录，输入命令`npm run build`，稍等片刻打包后的文件将输出到`habit-app-master/fontEnd/build`;
2. 把打包出来的`static`和`app.js`搬到`habit-app-master/server/static`;
#### 六、 开启服务器
1. 进入项目的`server`目录，输入命令`supervisor ./bin/www`即开启成功;

最后，在浏览器打开`http://localhost:3008`，如果见到下图即可

![成功界面](http://tsinglemon.com/images/success.png)
