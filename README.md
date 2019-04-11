### react antd通用模板
react结合生态库成为mvc
声明式编码 组件化编码
高效dom diff算法，最小化页面重绘，之前是得到dom对象，api改变dom属性和值。
拼接dom一次性插入，提升体验，1.只同级比较2.相同组件相同结构。3同类型组件key区分
继承react.Component为了继承生命周期


react+react router+redux+axios+babel+webpack
vue +vue router+vuex+axios+babel+webpack

yarn 速度快 安全(npm不安全，主版本次版本补丁版本) 更简洁的输出 更好的语义化
yarn init 初始化 npm init
yarn add 安装 npm install
yarn remove 卸载 npm uninstall
yarn 、yarn install 安装依赖 npm install


#### 生命周期
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



#### 区别 dependencies、devDependencies
--save-prod 将依赖的名称、版本要求写入 dependencies --save
--save-dev 将依赖的名称、版本要求写入 devDependencies
从命令行参数字面上，我们就能看出 dependencies、devDependencies 的区别：dependencies 表示我们要在生产环境下使用该依赖，devDependencies 则表示我们仅在开发环境使用该依赖。

webpack生产环境不需要，开发环境需要

#### antd按需加载
babel-plugin-import

#### 项目架构
页面结构定义(要做哪些页面)
目录结构定义(业务层面区分几大类目录)
栅格系统(antd)
 header category content footer
calc css动态计算长度 1vh 1%
 admin.js主结构代码

this.props.children

#### 路由
index.js ->router ->根组件(this.props.children,存放子组件)->Admin(包含侧边header footer content)
4.x路由时组件
api：router route link switch
browserrouter hashrouter route link navlink 
Route path exact component render 多层路由
navlink link
switch从上到下匹配，找到一个就不执行
browserrouter 动态 接口访问
hashrouter # 根路由，子路由在里面嵌套
```
<Route path='/admin/ui/buttons' component={Buttons} />
<Route path='/admin' render={()=>{
    <Admin></Admin>
}}
/>
<Switch>
    <Route path='/admin/ui/buttons' component={Buttons} />
</Switch>
<Redirect to='/admin/home' />
```
hash(browser)router中只能有一个子节点
第一种方法 router和标签放在一起
第二种可以导入路由标签 导航栏+this.props.children  
路由配置文件
`router.js <Router><Home><Route path='/' component={Main}></Route></Home></Router>`
嵌套路由 render
path="/main/:value" link中定义具体跳转变量 this.props.macth.params.value

/about/abc /about精准匹配可以分清 精准匹配主页面子路由没法显示 '/'


### redux
state reducer action dispatch 单项数据流
数据放到公共存储空间
reducer+flux(引入了reducer)
redux工作流程：store放数据，ui拿数据改数据，action是组件的动作，reducer记录状态
store唯一，reducer不唯一
store才能改变自己的内容，reducer拿到数据返回给store，store进行更新
reducer是纯函数，无异步操作new date等，无副作用(不对参数修改)
核心api：
createstore创建store
store.dispatch派发action
store.getstate获取store数据
store.subscribe监听store数据改变

点击买入，action改变
const action = {
    type:'add'
}
store.dispatch(action)
### 迭代器
依托生成器

pupeteer 

axios前端请求

前后端接口规范

document collection database

schema model entity

npm i request-promise-native -S
npm i request -S --registry=https://registry.npm.taobao.org
mpm i koa -s
npm i bcrypt -s
npm i glob -s
npm i lodash ramda -s
连接数据库

OSMEQWERTYUIOPASDFGHJKLZXCVBNM
this.ISMODIFIED password

8.5加盐加密

koa-router

nodmon

https://www.rails365.net/movies/react-redux-shi-xian-zhu-ce-deng-lu-ren-zheng-xi-tong-4-ye-mian-yu-lu-you-da-jian

mobx:https://blog.csdn.net/ZhangYaBo_Code/article/details/83066844?utm_source=blogxgwz5

yarn add redux react-redux redux-devtools-extension --save

总价：收益率 股票市值
历史记录：
成交价格
盈亏成本 买入股票 损失得道多少钱+手续费 实时计算 卖出资金-买入资金-买入-卖出手续费
成交数量
成交金额
成交时间
收益率 实时（0.5/6)/100% 卖出  

浮动盈亏：现在价格-买入价格 *持仓

手续费:万 10，卖出万 20

持仓占比

50000 - 50 =49950元
60000 - 50000 - 50 - 120 = 


"proxy": "http://118.24.8.141:7001",

"proxy": "http://192.168.199.200:7001",