react antd通用模板
react结合生态库成为mvc
声明式编码 组件化编码
高效dom diff算法，最小化页面重绘，之前是得到dom对象，api改变dom属性和值。
拼接dom一次性插入，提升体验，1.只同级比较2.相同组件相同结构。3同类型组件key区分

改变变量同步到ui，
react+react router+redux+axios+babel+webpack
vue +vue router+vuex+axios+babel+webpack

yarn 速度快 安全(npm不安全，主版本次版本补丁版本) 更简洁的输出 更好的语义化
yarn init 初始化 npm init
yarn add 安装 npm install
yarn remove 卸载 npm uninstall
yarn 、yarn install 安装依赖 npm install


生命周期
getDefaultProps初始化props属性，其他组件传递
getInitialState初始化组件状态
componentWillMount
render渲染
componentDidMount
componentWillReceiveProps
shouldComponentUpdate
componentWillUpdate
componentDidUpdate
componentWillUnmount
https://segmentfault.com/a/1190000016617400#articleHeader2



区别 dependencies、devDependencies
--save-prod 将依赖的名称、版本要求写入 dependencies --save
--save-dev 将依赖的名称、版本要求写入 devDependencies
从命令行参数字面上，我们就能看出 dependencies、devDependencies 的区别：dependencies 表示我们要在生产环境下使用该依赖，devDependencies 则表示我们仅在开发环境使用该依赖。

webpack生产环境不需要，开发环境需要