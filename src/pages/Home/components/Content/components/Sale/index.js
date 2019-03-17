import React, { Component } from 'react'
import {
  Card,
  Row,
  Col,
  Form,
  Input,
  Button,
  Select,
  message
} from 'antd';
import './index.less'
import {connect} from 'react-redux'
import {getPosition} from '../../../../../../redux/action'
import http from '../../../../../../axios'
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};
const FormItem = Form.Item;
const { Option } = Select;

class Index extends Component {
  constructor(props){
    super(props)
    this.saleAmount = 0
    this.salePrice = 0
  }

  componentDidMount(){
    const { dispatch } = this.props;
    const action = getPosition()
    dispatch(action)
  }

  state = {
    currentPrice:0,
    sid:'',
    saleSum:0,
    availSale:0
  }

  //买入金额失去焦点
  handleSaleBlur = (e)=> {
    this.salePrice = e.target.value
    if(e.target.value && this.saleAmount !== 0 ){
      const saleSum = this.saleAmount*this.salePrice
      this.setState({
        saleSum 
      })
    }
  }

  //买入数量失去焦点
  handleAmountBlur = (e)=> {
    this.saleAmount = e.target.value
    if(e.target.value && this.salePrice !== 0){
      const saleSum = this.saleAmount*this.salePrice
      const availFund = this.current - saleSum * (1+0.002)
      if(availFund<0){
        message.error('当前资金不足，请充值')
      }else{
        this.setState({
          availFund,
          saleSum 
        }) 
      }
    }
  }

  handleSubmit = () => {
    const sid = this.state.sid,
          availSale = this.state.availSale,//当前可卖
          count = this.saleAmount,//卖出数量
          price = this.salePrice
    if(count <= availSale){
      //请求接口
      const uid = sessionStorage.getItem('uid')
      http.post('/v1/transaction/buy',{sid,price,count,uid,type:0})
    }else{
      message.error('可卖数量小于卖出数量')
    }
  }

  handleSelect = async(value,Option) => {
    const sid = value.key
    const info = await http.get(`/v1/stock/${sid}`)
    this.setState({
      currentPrice:info.currentPrice,
      count:Option.props.count,
      sid
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { position,initData } = this.props
    this.position = position ? position :[];
    this.init = initData ? initData.init : 0 ;
    this.current = initData ? initData.current : 0 ;
    return (
      <div>
        <Card className='sale'>
          <Form>
            <Row>
              <Col span={8}>
                <FormItem {...formItemLayout} label='卖出股票'>
                  {getFieldDecorator('sName', {
                    rules: [{ required: true, message: 'Please select your stockName!' }],
                  })(
                    <Select placeholder="Select a stock" labelInValue onSelect={this.handleSelect}>
                        {this.position.map((item) => {
                            return <Option key={item.sid} title={item.sid} count={item.count} >{item.sname}</Option>;
                        
                      })}
                   </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                  <FormItem {...formItemLayout} label='股票代码'>
                      {getFieldDecorator('sid')(
                        <p>{this.state.sid}</p>
                      )}
                  </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                  <FormItem {...formItemLayout} label='当前价格'>
                      {getFieldDecorator('currentPrice')(
                        <p>{this.state.currentPrice}</p>
                      )}
                  </FormItem>
              </Col>
              <Col span={8}>
                  <FormItem {...formItemLayout} label='当前可卖'>
                      {getFieldDecorator('availAmount')(
                        <p>{this.state.availSale}</p>
                      )}
                  </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <FormItem {...formItemLayout} label='卖出价格'>
                  {getFieldDecorator('sale', {
                    rules: [{ required: true, message: 'Please input your price!' }],
                  })(
                    <Input placeholder="price" onBlur={this.handleSaleBlur}/>
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem {...formItemLayout} label='卖出数量'>
                  {getFieldDecorator('saleAmount', {
                    rules: [{ required: true, message: 'Please input your sale amount!' }],
                  })(
                    <Input placeholder="sale" onBlur={this.handleAmountBlur} />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                  <FormItem {...formItemLayout} label='可用金额'>
                      {getFieldDecorator('availSum')(
                        <p>{this.current.toFixed(2)}</p>
                      )}
                  </FormItem>
              </Col>
              <Col span={8}>
                  <FormItem {...formItemLayout} label='卖出金额'>
                      {getFieldDecorator('saleSum')(
                        <p>{this.state.saleSum}</p>
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
              <Button className='btn' type="primary" onClick={this.handleSubmit}>卖出下单</Button>
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
    initData :state.initData,
    position :state.position
  }
}
const Sale= Form.create({})(Index);
export default connect(mapstatetoprops)(Sale)