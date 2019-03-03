import React, { Component } from 'react'
import {
  Card,
  Row,
  Col,
  Form,
  Input,
  Button,
} from 'antd';
import './index.less'
import http from '../../../../../../axios/index'
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};
const FormItem = Form.Item;

class Index extends Component {
  handlePress=(e)=>{
    console.log(e.target.value)
    this.getstock(e.target.value)
  }
  async getstock(item){
    const info = await http.get(`/v1/stock/${item}`)
    console.log(info)
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Card className='purchase'>
          <Form>
            <Row>
              <Col span={8}>
                <FormItem {...formItemLayout} label='买入股票'>
                  {getFieldDecorator('stockName', {
                    rules: [{ required: true, message: 'Please input your stockName!' }],
                  })(
                    <Input placeholder="stockName" onChange={this.handleChange} onPressEnter={this.handlePress}/>
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                  <FormItem {...formItemLayout} label='股票名称'>
                      {getFieldDecorator('stock')(
                        <p>xxx</p>
                      )}
                  </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                  <FormItem {...formItemLayout} label='当前价格'>
                      {getFieldDecorator('currentPrice')(
                        <p>xxx</p>
                      )}
                  </FormItem>
              </Col>
              <Col span={8}>
                  <FormItem {...formItemLayout} label='当前可买'>
                      {getFieldDecorator('availAmount')(
                        <p>xxx</p>
                      )}
                  </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <FormItem {...formItemLayout} label='买入价格'>
                  {getFieldDecorator('purchase', {
                    rules: [{ required: true, message: 'Please input your price!' }],
                  })(
                    <Input placeholder="price" />
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem {...formItemLayout} label='买入数量'>
                  {getFieldDecorator('purchaseAmount', {
                    rules: [{ required: true, message: 'Please input your purchase amount!' }],
                  })(
                    <Input placeholder="Purchase" />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                  <FormItem {...formItemLayout} label='可用金额'>
                      {getFieldDecorator('availSum')(
                        <p>xxx</p>
                      )}
                  </FormItem>
              </Col>
              <Col span={8}>
                  <FormItem {...formItemLayout} label='买入金额'>
                      {getFieldDecorator('purchaseSum')(
                        <p>xxx</p>
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
              <Button className='btn' type="primary" htmlType="submit">下单</Button>
              <Button className='btn' type="primary" htmlType="refresh">刷新</Button>
              <Button className='btn' type="primary" htmlType="reset">重置</Button>
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