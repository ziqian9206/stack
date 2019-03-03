import React, { Component } from 'react'
import { Card, Row,Col } from 'antd';
import './index.less'
import {observer} from 'mobx-react'
import { observable,toJS } from 'mobx'
import fundStore from '../../../../store/fund';
import AppStore from '../../../../store/app';

@observer class CountInfo extends Component {
  constructor(props){
    super(props)
    this.appStore = new AppStore()
  }

  async getInfo(){
    await fundStore(this.appStore)
    console.log(222,this.appStore)
  }

  componentDidMount(){
    this.getInfo()
  }
  render() {
    return (
      <Card
        className='pesonInfo'
        title="个人信息"
      >
      <Row>
        <Col span={8}>
          <span className='letter'>起始资金：{this.appStore.init}元</span>
        </Col>
        <Col span={8}>
          <span className='letter'>现有资金：{this.appStore.current}元</span>  
        </Col>
        <Col span={8}>
          <span className='letter'>总资产：1000000.00</span>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <span className='letter'>收益率：30%</span>
        </Col>
        <Col span={8}>
          <span className='letter'>股票市值：-8.50%</span>
        </Col>
      </Row>
    </Card>
    )
  }
}
 {/* <p>共<span className="total-num">{this.props.tableData.total}</span>条数据 */}
 export default CountInfo