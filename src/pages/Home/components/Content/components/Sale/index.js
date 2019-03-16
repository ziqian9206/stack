import React, { Component } from 'react'
import {
  Card,
  Row,
  Col,
  Form,
  Input,
  Button,
  Select,
} from 'antd';
import './index.less'
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};
const FormItem = Form.Item;

class Index extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Card className='sale'>
          <Form>
            <Row>
              <Col span={8}>
                <FormItem {...formItemLayout} label='卖出股票'>
                  {getFieldDecorator('stockName', {
                    rules: [{ required: true, message: 'Please select your stockName!' }],
                  })(
                    <Select placeholder="Select a stock"/>
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
                <FormItem {...formItemLayout} label='卖出价格'>
                  {getFieldDecorator('purchase', {
                    rules: [{ required: true, message: 'Please input your price!' }],
                  })(
                    <Input placeholder="price" />
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem {...formItemLayout} label='卖出数量'>
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
                  <FormItem {...formItemLayout} label='卖出金额'>
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
              <Button className='btn' type="primary" >卖出下单</Button>
            </Form.Item>
            </Row>
          </Form>
        </Card>
        
      </div>
    )
  }
}

const Sale= Form.create({})(Index);
export default Sale