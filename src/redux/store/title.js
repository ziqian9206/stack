//引入createStore,定义数据源
import { createStore } from 'redux'
//store-》reducer-》action
import { reducer } from '../reducer/title'
import { composeWithDevTools } from 'redux-devtools-extension'


export default (preState)=>createStore(reducer,preState)