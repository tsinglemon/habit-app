import React, { Component } from "react";

export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null
      };
    }

    async componentDidMount() {
      const { default: component } = await importComponent();

      this.setState({
        component: component
      });
    }

    render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : null;
    }
  }

  return AsyncComponent;
}

// 路由v4的按需加载 https://segmentfault.com/a/1190000009539836#articleHeader4
// 但报错“Uncaught ReferenceError: regeneratorRuntime is not defined”
// 解决办法是添加babel预设 
// https://www.jianshu.com/p/7a7f7abcddb5
// https://babeljs.cn/docs/plugins/transform-runtime/
// https://babeljs.cn/docs/plugins/preset-stage-1/#%E9%80%9A%E8%BF%87-babelrc-%E6%96%87%E4%BB%B6%E6%8E%A8%E8%8D%90