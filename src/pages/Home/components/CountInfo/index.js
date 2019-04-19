import React, { Component } from 'react'
import { Card, Row,Col ,Button} from 'antd';
import './index.less'
import {connect} from 'react-redux'
import http from '@/axios'
import {toDecimal} from '@/utils/util'
import { getInit, fundAction } from '@/redux/action'
class CountInfo extends Component {
  constructor(props){
    super(props)
    this.totalFund = 0
    this.stockValue = 0
  }

  componentDidMount(){
    const { dispatch } = this.props;
    const initAction = getInit()
    dispatch(initAction)
    this.getAllStock()
  }
//拿到store里的值，2.遍历store3.拿到sid请求数据4.获得数据的
  getAllStock = () => {
    const {initData,dispatch} = this.props;
    let subject = new Subject()
    let observer = new Observer('stockValue',subject)
    if(initData && initData.init){
        let data = JSON.parse(JSON.stringify(initData.stocks));
        data.map( async (item) => {
          const info = await http.get(`/v1/stock/${item.sid}`)
          this.stockValue = info.currentPrice * item.hold
          subject.setState(this.stockValue,dispatch)
        })
    }
  }

 

  render() {
    const {initData, stockValue} = this.props;
    const init = initData ? initData.init : 1000000 ;
    const current = initData ? initData.current : 0 ;
    this.getAllStock()
    const totalFund = toDecimal(stockValue + current);
    const yieldRate = toDecimal(100*(totalFund - init)/init);
    return (
      <Card
        className='pesonInfo'
        title="个人信息"
      >
      <Row>
        {/* <Col span={8}>
          <span className='letter'>起始资金：{init.toFixed(2)}元</span>
        </Col> */}
        {/* <Col span={8}>
          <span className='letter'>现有资金：{current.toFixed(2)}元</span>  
        </Col> */}
        <Col span={8}>
          <span className='letter'>总资产：{totalFund}</span>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <span className='letter yield'>收益率：{yieldRate}%</span>
        </Col>
        <Col span={8}>
          <span className='letter'>股票市值：{toDecimal(stockValue)}</span>
        </Col>
      </Row>
    </Card>
    )
  }
}
const mapstatetoprops = state =>{
  return{
    initData : state.initData,
    stock : state.stock,
    stockValue : state.stockValue
  }
}
export default connect(mapstatetoprops)(CountInfo)

class Subject{
  constructor(){
    this.state = 0;
    this.obsevers = []
  }
  getState(){
    return this.state
  }
  setState(state,dispatch){
    this.state += state
    setTimeout(() => {
      this.notifyAllObservers(dispatch)
    }, 1000);
  }
  notifyAllObservers(dispatch){
    this.obsevers.map( observer => {
      observer.update(dispatch)
    })
  }
  attach(observer){
    this.obsevers.push(observer)
  }
}

class Observer {
  constructor(name, subject){
    this.name = name
    this.subject = subject
    this.subject.attach( this )
  }
  update(dispatch){
    dispatch(fundAction(this.subject.getState()))
    return this.subject.getState()
  }
}