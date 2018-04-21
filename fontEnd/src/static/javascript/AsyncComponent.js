
//第二种写法

// com             String ===> 要提取的组件名，不传默认是default
// loadComponent   Function ===> () => import("Zujian3",/*webpackChunkName:"zujian3"*/"./zujian3.jsx")
import React from 'react'
export const asyncComponent = (com, loadComponent) => {
    if (!com && com !== "") return console.error("asyncComponent函数至少传入一个import()");
    if (loadComponent) {
        com = typeof com === "function" ? com().toString()
            : typeof com === "string" && com !== "" ? com
                : "default";
    } else {
        loadComponent = com;
        com = "default"
    }


    return class AsyncComponent extends React.Component {
        state = {
            Component: null,
        }

        componentWillMount() {
            if (this.hasLoadedComponent()) {
                return;
            }

            loadComponent()
                .then(module => {
                    if (module[com] === undefined) {
                        console.error("asyncComponent函数不指定组件，默认走default的组件，请检查组件是否正确导出！")
                    } else {
                        return module[com]
                    }
                })
                .then((Component) => {
                    this.setState({ Component });
                })
                .catch((err) => {
                    console.error(`Cannot load component in <AsyncComponent />`);
                    throw err;
                });
        }

        hasLoadedComponent() {
            return this.state.Component !== null;
        }

        render() {
            const { Component } = this.state;
            return (Component) ? <Component {...this.props} /> : null;
        }
    }
};


// 路由v4的按需加载 https://segmentfault.com/a/1190000009539836#articleHeader4
//                 https://segmentfault.com/a/1190000009820646
// 但报错“Uncaught ReferenceError: regeneratorRuntime is not defined”
// 解决办法是添加babel预设 
// https://www.jianshu.com/p/7a7f7abcddb5
// https://babeljs.cn/docs/plugins/transform-runtime/
// https://babeljs.cn/docs/plugins/preset-stage-1/#%E9%80%9A%E8%BF%87-babelrc-%E6%96%87%E4%BB%B6%E6%8E%A8%E8%8D%90