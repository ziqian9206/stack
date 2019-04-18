import React, { Component } from 'react'
import {
  Card,
  Row,
  Col,
  Form,
  Input,
  Button,
  message
} from 'antd';
import './index.less'
import {connect} from 'react-redux'
import {toDecimal} from '@/utils/util'
import http from '@/axios/index'
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};
const FormItem = Form.Item;


class Index extends Component {
  constructor(props){
    super(props)
    this.purchaseAmount = 0
    this.purchasePrice = 0
  }

  state = {
      infoData:{},
      availNum:0,
      availFund:0,
      purchaseSum:0
  }

  //输入股票代码点击回车
  handleStockPress=(e)=>{
    this.getstock(e.target.value)
  }
  //获得当前股票价格，股票名，可用资金，可买数量
  async getstock(item){
    const info = await http.get(`/v1/stock/${item}`)
    const availNum = parseInt(this.current/info.currentPrice/100)
    if(availNum<1){
      message.error('当前可买不足一手，请充值')
    }else{
      this.setState({
        infoData:{...info},
        availNum
      })
    }
  }
  //股票input失去焦点
  hanldeStockBlur=(e)=>{
    this.getstock(e.target.value)
  }
  买入金额失去焦点
  handlePurchaseBlur=(e)=>{
    this.purchasePrice = e.target.value
    if(e.target.value && this.purchaseAmount !== 0 ){
      const purchaseSum = toDecimal(this.purchaseAmount*this.purchasePrice);
      this.setState({
        purchaseSum 
      })
    }
  }
  //买入数量失去焦点
  handleAmountBlur=(e)=>{
    this.purchaseAmount = e.target.value
    if(e.target.value && this.purchasePrice !== 0){
      const purchaseSum = toDecimal(this.purchaseAmount*this.purchasePrice)
      const availFund = this.current - purchaseSum * (1+0.001)
      if(availFund<0){
        message.error('当前资金不足，请充值')
      }else{
        this.setState({
          availFund,
          purchaseSum 
        }) 
      }
    }
  }
  //下单 type买入
  handleSubmit = async()=>{
    const sid = this.state.infoData.sid
    const count = toDecimal(this.purchaseAmount)
    const price = toDecimal(this.purchasePrice)
    const uid = sessionStorage.getItem('uid')
    await http.post('/v1/transaction/buy',{sid,price,count,uid,type:1})
    window.location.href = '/home'
  }
  
  render() {
    const { getFieldDecorator } = this.props.form;
    const {initData} = this.props;
    this.init = initData ? initData.init : 0 ;
    this.current = initData ? initData.current : 0 ;
    return (
      <div>
        <Card className='purchase'>
          <Form>
            <Row>
              <Col span={8}>
                <FormItem {...formItemLayout} label='买入股票'>
                  {getFieldDecorator('sid', {
                    rules: [{ required: true, message: 'Please input your stockcode!' }],
                  })(
                    <Input placeholder="stockcode" onChange={this.handleStockChange} onBlur={this.hanldeStockBlur} onPressEnter={this.handleStockPress}/>
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                  <FormItem {...formItemLayout} label='股票名称'>
                      {getFieldDecorator('stockName')(
                        <p>{this.state.infoData.name}</p>
                      )}
                  </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                  <FormItem {...formItemLayout} label='当前价格'>
                      {getFieldDecorator('currentPrice')(
                        <p>{ this.state.infoData.currentPrice }</p>
                      )}
                  </FormItem>
              </Col>
              <Col span={8}>
                  <FormItem {...formItemLayout} label='当前可买'>
                      {getFieldDecorator('availAmount')(
                        <p>{ this.state.availNum}手</p>
                      )}
                  </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <FormItem {...formItemLayout} label='买入价格'>
                  {getFieldDecorator('purchasePrice', {
                    rules: [{ required: true, message: 'Please input your price!' }],
                  })(
                    <Input placeholder="price" onBlur={this.handlePurchaseBlur} />
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem {...formItemLayout} label='买入数量'>
                  {getFieldDecorator('purchaseAmount', {
                    rules: [{ required: true, message: 'Please input your purchase amount!' }],
                  })(
                    <Input placeholder="Purchase" onBlur={this.handleAmountBlur} />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                  <FormItem {...formItemLayout} label='可用金额'>
                      {getFieldDecorator('availFund')(
                        <p>{this.current.toFixed(2)}元</p>
                      )}
                  </FormItem>
              </Col>
              <Col span={8}>
                  <FormItem {...formItemLayout} label='买入金额'>
                      {getFieldDecorator('purchaseSum')(
                        <p>{this.state.purchaseSum}元</p>
                      )}
                  </FormItem>
              </Col>
            </Row>
            <Row>
              <Form.Item
                wrapperCol={{
                  xs: { span: 24, offset: 0 },
                  sm: { span: 16, offset: 8 },
                }}
              >
              <Button className='btn' type="primary" onClick={this.handleSubmit}>下单</Button>
            </Form.Item>
            </Row>
          </Form>
        </Card>
        
      </div>
    )
  }
}
const mapstatetoprops = state =>{
  return{
    initData :state.initData
  }
}
const Purchase= Form.create({})(Index);
export default connect(mapstatetoprops)(Purchase)
