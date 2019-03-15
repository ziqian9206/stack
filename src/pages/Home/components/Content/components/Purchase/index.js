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
import http from '../../../../../../axios/index'
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};
const FormItem = Form.Item;


class Index extends Component {
  constructor(props){
    super(props)
    this.fund = 0//总金额
    this.availNum = 0//可买入数量
    this.purchaseAmount=0//买入数量
    this.purchasePrice=0//买入价格
    this.store = {}
  }
  state = {
    currentFund:0
  }
  //输入股票代码点击回车
  // handleStockPress=(e)=>{
  //   this.getstock(e.target.value)
  // }

  // //股票input失去焦点
  // hanldeStockBlur=(e)=>{
  //   this.getstock(e.target.value)
  // }
  //买入金额失去焦点
  // handlePurchaseBlur=(e)=>{
  //   this.purchasePrice = e.target.value
  //   if(e.target.value && this.purchaseAmount){
  //     this.stockStore.purchaseSum = this.purchaseAmount*this.purchasePrice
  //     this.stockStore.availFund = this.fund - this.stockStore.purchaseSum
  //     if(this.stockStore.availFund<0){
  //       message.error('当前资金不足，请充值')
  //     }else{
  //       sessionStorage.setItem('currentfund',this.stockStore.availFund)
  //     } 
  //   }
  // }
  //买入数量失去焦点
  // handleAmountBlur=(e)=>{
  //   this.purchaseAmount = e.target.value
  //  if(e.target.value && this.purchasePrice){
  //     this.stockStore.purchaseSum = this.purchaseAmount*this.purchasePrice
  //     this.stockStore.availFund = this.fund - this.stockStore.purchaseSum
  //     if(this.stockStore.availFund<0){
  //       message.error('当前资金不足，请充值')
  //     }
  //   }
  // }
  //下单
  // handleSubmit = ()=>{
  //   const {
  //     sid='',
  //     purchaseAmount,
  //     purchasePrice
  //   } = this.props.form.getFieldsValue()
  //   const params = {
  //     uid:sessionStorage['uid'],
  //     sid:sid,
  //     count:parseInt(purchaseAmount),//买入数目
  //     price:parseFloat(purchasePrice)//买入价钱
  //   }
  //   http.post('/v1/transaction/buy',params,()=>{
  //     //重新得道数据
  //     fundStore()
  //     this.forceUpdate();
  //     console.log(111)
  //   })
  // }
  //获得当前股票价格，股票名，可用资金，可买数量
  // async getstock(item){
  //   const info = await http.get(`/v1/stock/${item}`)
  //   this.stockStore.currentPrice = info.data.currentPrice;
  //   this.stockStore.name = info.data.name
  //   this.fund = sessionStorage['currentfund']
  //   this.stockStore.availFund = this.fund
  //   const availNum = parseInt(this.stockStore.availFund/this.stockStore.currentPrice/100)
  //   if(availNum<1){
  //     message.error('当前可买不足一手，请充值')
  //   }else{
  //     this.stockStore.availNum = availNum
  //   }
  // }
  render() {
    const { getFieldDecorator } = this.props.form;
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
                        <p>{"this.stockStore.name"}</p>
                      )}
                  </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                  <FormItem {...formItemLayout} label='当前价格'>
                      {getFieldDecorator('currentPrice')(
                        <p>{"this.stockStore.currentPrice" }</p>
                      )}
                  </FormItem>
              </Col>
              <Col span={8}>
                  <FormItem {...formItemLayout} label='当前可买'>
                      {getFieldDecorator('availAmount')(
                        <p>{"this.stockStore.availNum"}手</p>
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
                      {getFieldDecorator('availSum')(
                        <p>{"this.stockStore.availFund"}元</p>
                      )}
                  </FormItem>
              </Col>
              <Col span={8}>
                  <FormItem {...formItemLayout} label='买入金额'>
                      {getFieldDecorator('purchaseSum')(
                        <p>{"this.stockStore.purchaseSum"}元</p>
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
              <Button className='btn' type="primary" >刷新</Button>
              <Button className='btn' type="primary" >重置</Button>
            </Form.Item>
            </Row>
          </Form>
        </Card>
        
      </div>
    )
  }
}

const Purchase= Form.create({})(Index);
export default Purchase