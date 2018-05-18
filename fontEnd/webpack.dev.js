


const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common,{
    devServer: {
        proxy: {
            "/api": "http://localhost:3008"
        },
        publicPath:"/",
        contentBase: "./src",
        open: true,
        port: 3000,
        hot: true,
        // 参考：https://echizen.github.io/tech/2016/07-05-webpack-dev-server-react-router-config
        // 如果使用了browserRouter，那么这个就是模拟服务端返回原本的index.html
        // devServer.historyApiFallback的意思是当路径匹配的文件不存在时不出现404,
        // 而是取配置的选项historyApiFallback对应的文件。
        historyApiFallback: {
            rewrites: [
                {
                    from: /^\/$/,
                    to: "/build/index.html"
                }
            ]
        },
        // historyApiFallback: true
    },
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                use: [
                    // 插入内联样式
                    "style-loader", {
                        // 解析css
                        loader: "css-loader",
                        options: {
                            modules: false,
                            // 定义类名，默认是［hash:base64］
                            // localIdentName: '[path][name]-[local]_[hash:base64:4]'
                        }
                    }, {
                        // 兼容css，相关配置在 postcss.config.js 里面
                        loader: "postcss-loader"
                    },{
                        loader:"less-loader"
                    }
                ],
                // 引入的包不使用
                include:[
                    path.resolve(__dirname,"node_modules/normalize.css"),
                    path.resolve(__dirname,"node_modules/antd-mobile"),
                    path.resolve(__dirname,"src/static/fonts"),
                    path.resolve(__dirname,"src/static/stylesheet")
                ],
                exclude:[]
                
            },
            // 自己写的样式使用模块化
            {
                test: /\.(css|less)$/,
                use: [
                    // 插入内联样式
                    "style-loader", {
                        // 解析css
                        loader: "css-loader",
                        options: {
                            modules: true,
                            // 定义类名，默认是［hash:base64］
                            // localIdentName: '[path][name]-[local]_[hash:base64:4]'
                            localIdentName: '[name]-[local]_[hash:base64:4]'
                        }
                    }, {
                        // 兼容css，相关配置在 postcss.config.js 里面
                        loader: "postcss-loader"
                    },{
                        loader:"less-loader"
                    }
                ],
                include:[
                    path.resolve(__dirname,"src/component-container"),
                    path.resolve(__dirname,"src/component-show"),
                ],
                exclude:[]
            },
        ]
    },
    plugins: [
        // 它使用模块的相对路径作为模块的 id，
        // 所以只要我们不重命名一个模块文件，那么它的id就不会变，更不会影响到其它模块
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
})