import React, { Component } from 'react'
import {
  Card,
  Row,
  Col,
  Form,
  Input,
  Button,
  message,
  DatePicker,
  Select
} from 'antd';
import http from '../../axios'
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};
const FormItem = Form.Item;
const { Option } = Select;
class Index extends Component {
    constructor(props) {
        super(props);
    }
    handleSubmit = async ()=>{
       const data = this.formatFormParams();
       const record = await http.post('/v1/transaction/record',data)
       if(record && record.data){
        message.success('录入成功')
        this.props.form.resetFields();
       }else{
         message.error('录入失败请，重新录入')
       }
    }
    formatFormParams = () => {
    let {
        sid,
        sname,
        action,
        count,
        price,
        totalFund,
        earning,
        date
        } = this.props.form.getFieldsValue();
        const time = date ? new Date(date).getTime() : '';
        return{
            sid,
            sname,
            action,
            time,
            count:Number(count),
            price:Number(price),
            totalFund:Number(totalFund),
            earning:Number(earning)
        }
    }
  render() {
    const { getFieldDecorator } = this.props.form;
    const config = {
      rules: [{ type: 'object', required: true, message: 'Please select time!' }],
    };
    return (
      <div>
        <Card className='history'>
          <Form>
            <Row>
              <Col span={8}>
                <FormItem {...formItemLayout} label='股票名称'>
                  {getFieldDecorator('sname', {
                    rules: [{ required: true, message: 'Please input your stockName!' }],
                  })(
                    <Input placeholder="stockName" />
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                  <FormItem {...formItemLayout} label='股票代码'>
                    {getFieldDecorator('sid', {
                        rules: [{ required: true, message: 'Please input your stockcode!' }],
                    })(
                        <Input placeholder="stockcode" />
                    )}
                  </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                  <FormItem {...formItemLayout} label='买入/卖出'>
                    {getFieldDecorator('action', {initialValue:1,
                        rules: [{ required: true, message: 'Please input your action!' }],
                    })(
                        <Select>
                            <Option value={0}>卖出</Option>
                            <Option value={1}>买入</Option>
                        </Select>
                    )}
                  </FormItem>
              </Col>
              <Col span={8}>
                  <FormItem {...formItemLayout} label='成交价格'>
                    {getFieldDecorator('price', {
                        rules: [{ required: true, message: 'Please input your price!' }],
                    })(
                        <Input placeholder="price" />
                    )}
                  </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                  <FormItem {...formItemLayout} label='成交金额'>
                    {getFieldDecorator('totalFund', {
                        rules: [{ required: true, message: 'Please input your totalFund!' }],
                    })(
                        <Input placeholder="totalFund" />
                    )}
                  </FormItem>
              </Col>
              <Col span={8}>
                <FormItem {...formItemLayout} label='成交数量'>
                  {getFieldDecorator('count', {
                    rules: [{ required: true, message: 'Please input your count!' }],
                  })(
                    <Input placeholder="count" />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                  <FormItem {...formItemLayout} label='交易盈亏'>
                    {getFieldDecorator('earning', {
                        rules: [{ required: true, message: 'Please input your earning!' }],
                    })(
                        <Input placeholder="earning" />
                    )}
                  </FormItem>
              </Col>
              <Col span={8}>
                     <Form.Item
                        label="时间"
                        {...formItemLayout}
                        >
                        {getFieldDecorator('date', config)(
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                        )}
                    </Form.Item>
                </Col>
            </Row>
            <Row>
              <Form.Item
                wrapperCol={{
                  xs: { span: 24, offset: 0 },
                  sm: { span: 16, offset: 8 },
                }}
              >
              <Button className='btn' type="primary" onClick={this.handleSubmit}>录入</Button>
            </Form.Item>
            </Row>
          </Form>
        </Card>
      </div>
    )
  }
}
const History= Form.create({})(Index);
export default History