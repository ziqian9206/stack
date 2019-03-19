import React, { Component } from 'react'
import { Card, Row,Col } from 'antd';
import './index.less'
import {connect} from 'react-redux'
import http from '../../../../axios'
import { getInit } from '../../../../redux/action'
class CountInfo extends Component {
  constructor(props){
    super(props)
    this.stockValue = 0
    this.totalFund = 0
    this.yieldRate= 0
  }

  componentDidMount(){
    const { dispatch } = this.props;
    const initAction = getInit()
    dispatch(initAction)
    this.getAllStock()
  }

  state = {
    yieldRate:0
    
  }

  getAllStock = () => {
    const {initData} = this.props;
    if(initData && initData.init){
      initData.stocks.map( async (item) => {
        const info = await http.get(`/v1/stock/${item.sid}`)
        const stockValue = info.currentPrice * item.hold
        this.stockValue += stockValue;
      })
      this.totalFund = this.stockValue + initData.current;
      this.yieldRate = (this.totalFund - initData.current)/initData.current
    }
  }

  render() {
    const {initData} = this.props;
    const init = initData ? initData.init : 0 ;
    const current = initData ? initData.current : 0 ;
    this.getAllStock()
    return (
      <Card
        className='pesonInfo'
        title="个人信息"
      >
      <Row>
        <Col span={8}>
          <span className='letter'>起始资金：{init.toFixed(2)}元</span>
        </Col>
        <Col span={8}>
          <span className='letter'>现有资金：{current.toFixed(2)}元</span>  
        </Col>
        <Col span={8}>
          <span className='letter'>总资产：{this.totalFund === 0 ? init : this.totalFund.toFixed(2)}</span>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <span className='letter'>收益率：{this.yieldRate.toFixed(4)}</span>
        </Col>
        <Col span={8}>
          <span className='letter'>股票市值：{this.stockValue}</span>
        </Col>
      </Row>
    </Card>
    )
  }
}
const mapstatetoprops = state =>{
  return{
    initData : state.initData,
    stock : state.stock
  }
}
export default connect(mapstatetoprops)(CountInfo)
 {/* <p>共<span className="total-num">{this.props.tableData.total}</span>条数据 */}
