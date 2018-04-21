

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    // 输入
    entry: {
        // 多入口的写法，习惯用这种写法吧，方便增加其他入口
        app: "./src/app.js"
    },
    // 输出
    output: {
        // 打包后的输出的目录
        path: path.resolve(__dirname, "build/"),
        // 线上的绝对路径，如果是本地的话为空就行
        publicPath: "/",
        // 输出的文件名，如果有多个文件就用方括号表示不同的文件名
        filename: "[name].js",
        // 设置按需加载的文件名
        chunkFilename: 'javascript/[name].chunk.js',
    },
    // 解析
    resolve: {
        // 设置模块默认路径
        modules: [
            "node_modules",
            // path.resolve(__dirname,'src/resolve')
        ],
        // 跟上面modules的区别是可以为路径起别名。
        // 给源码目录起名字，方便在源码上请求其他模块时少写一些路径代码，但不会作用在配置文件里。
        alias: {
            // 在源码中请求 src/resolve 下的 m1.js 文件时，变成这样 moduleDirName/m1.js
            // moduleDirName: path.resolve(__dirname, "src/resolve")
        }
    },
    // 解析模块
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: [
                    {
                        // 使用babel-loader转换es6，和解析jsx，具体的babel预设放在根目录的 .babelrc 里面
                        loader: "babel-loader"
                    }
                ],
                include:[
                    path.resolve(__dirname,"node_modules/normalize.css"),
                    path.resolve(__dirname,"node_modules/antd-mobile"),
                    path.resolve(__dirname,"node_modules/ansi-html"),
                    path.resolve(__dirname,"src")
                ],
                exclude:[]
            },{
                test: /\.(mp4|mp3|ico|jpg|jpeg|png|gif|svg|eot|otf|webp|ttf|woff|woff2)(\?.*)?$/,// "(\?.*)?"在问号后面可有可无一个或多个的任意字符
                use: {
                    loader: "url-loader",
                    options: {
                        // 如果不满足limit，将回退使用 file-loader，默认也是file-loader
                        // file-loader 让webpack以文件的形式释放所需的对象，并返回其公共URL
                        fallback: "file-loader",
                        // 单位是字节，小于该字节将转换成 DataURL 格式
                        limit: 2048,
                        // 配置输出的目录
                        outputPath: "assets",
                        // 配置文件名和格式，当然也可以定义目录
                        name: "[name].[ext]"
                    }
                },
                include:[
                    path.resolve(__dirname,"node_modules/normalize.css"),
                    path.resolve(__dirname,"node_modules/antd-mobile"),
                    path.resolve(__dirname,"src")
                ],
                exclude:[]
            }
        ]
    },
    // 插件
    plugins: [
        // 生成引用一个或多个出口文件的html，需要生成多少个 html 就 new 多少此该插件
        new HtmlWebpackPlugin({
            // 没有引入模板时的默认title，favicon也一样，但filename除外
            title: "我的index.html",
            // favicon: path.resolve(__dirname, "src/img/fav.ico"),
            // 定义插入到文档哪个节点，默认在body倒数位置
            inject: "body",
            filename: "index.html",
            template: path.resolve(__dirname, "src/index.html"),
            // 压缩html文件 
            // 详细的配置 https://github.com/kangax/html-minifier#options-quick-reference
            minify: {
                // 压缩成了一行，默认为false
                collapseWhitespace: false
            },
            // 在js文件后面加上一段hash码，默认为false
            hash: false,
            // 有更新才生成新的文件，默认为true
            cache: true,
            // 指定引入的出口文件，如果不写，将全部引用
            // 注意，如果使用了CommonsChunkPlugin抽取公共模块，那么抽取出来的公共模块也要一同写上，不然会引用不到公共模块
            // chunks: ["common","app", "app1"],
            // 跟chunks相反，即跳过指定的出口文件
            // excludeChunks: ["app1"]
        }),
    ]
};