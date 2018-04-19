


const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common,{
    devServer: {
        proxy: {
            "/api": "http://localhost:3006"
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
                test: /\.css$/,
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
                    }
                ],
                include:[
                    path.resolve(__dirname,"./src")
                ]
            },
        ]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
})