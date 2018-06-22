

// 单独引用才可以使用内置的插件
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const extract_iconfont = new extractTextPlugin({
    filename: "static/fonts/iconfont.css"
})
const extract_index = new extractTextPlugin({
    filename: "static/stylesheet/index.css"
})
const extract_module = new extractTextPlugin({
    filename: "static/stylesheet/module.css"
})

module.exports = merge(common, {
    devtool: "none",
    module: {
        rules: [
            {
                test: /iconfont.css$/,
                use: extract_iconfont.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                modules: false,
                            }
                        }, {
                            loader: "postcss-loader"
                        }, {
                            loader: "less-loader"
                        }
                    ]
                }),
                include: [
                    path.resolve(__dirname, "./src/static/fonts")
                ]
            },
            {
                test: /\.css$/,
                use: extract_index.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                modules: false,
                            }
                        }, {
                            loader: "postcss-loader"
                        }, {
                            loader: "less-loader"
                        }
                    ]
                }),
                include: [
                    path.resolve(__dirname, "node_modules/normalize.css"),
                    path.resolve(__dirname, "node_modules/antd-mobile"),
                    path.resolve(__dirname, "node_modules/react-wx-images-viewer"),
                    path.resolve(__dirname, "./src/static/stylesheet")
                ]
            },
            {
                test: /\.css$/,
                use: extract_module.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                modules: true,
                                localIdentName: '[path][name]-[local]_[hash:base64:4]'
                            }
                        }, {
                            loader: "postcss-loader"
                        }, {
                            loader: "less-loader"
                        }
                    ]
                }),
                include: [
                    path.resolve(__dirname, "src/component-container"),
                    path.resolve(__dirname, "src/component-show"),
                ]
            },
            // // 这个专门用来做路由切换动画，因为目前只知道把样式嵌套在style里面才有效果。
            // {
            //     test: /\.css$/,
            //     use: [
            //         // 插入内联样式
            //         "style-loader", {
            //             // 解析css
            //             loader: "css-loader",
            //             options: {
            //                 modules: false,
            //                 // 定义类名，默认是［hash:base64］
            //                 // localIdentName: '[path][name]-[local]_[hash:base64:4]'
            //             }
            //         }, {
            //             // 兼容css，相关配置在 postcss.config.js 里面
            //             loader: "postcss-loader"
            //         }
            //     ],
            //     include:[
            //         path.resolve(__dirname,"./src/css")
            //     ]
            // }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(
            // 指定删除的目录
            ["build"],
            // 配置如何删除
            {
                // 指定要删除的绝对路径下
                root: __dirname,
            }
        ),
        // 提取css到单独文件
        extract_iconfont,
        extract_index,
        extract_module,
        // 代码压缩
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_debugger: true,
                drop_console: true
            }
        }),
        // 定义开发环境，这里定义了开发环境
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "common",
            filename: "static/javascript/chunk/[name].js",
            minChunks: 2
        })
    ]
})