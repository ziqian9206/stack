import React, { Component } from 'react'
import { Table,Form,DatePicker, Button ,Row, Col } from 'antd';
import http from '@/axios/index'
import moment from 'moment';
import './index.less'

const formItemLayout = {
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const rangeConfig = {
  rules: [{ type: 'array', required: true, message: 'Please select time!' }],
};
const formatTime = date => (
  new moment(date).toDate().getTime()
);

class History extends Component {
  constructor(props){
    super(props);
    this.state = {
      tableData:[]
    }
    this.positionColumns =[
      {
        title:'成交日期',
        dataIndex:'time',
        key:'date',
        render:text => {
          return <span key={text}>{new moment(text).format('YYYY-MM-DD')}</span>;
        }
      },
      {
        title:'成交时间',
        dataIndex:'time',
        key:'time',
        render:text => {
          return <span key={text}>{new moment(text).format('h:mm:ss a')}</span>;
        }
      },
      {
        title:'股票名称',
        dataIndex:'sname',
        key:'sname'
      },
      {
        title:'股票代码',
        dataIndex:'sid',
        key:'sid'
      },
      {
        title:'买入/卖出',
        dataIndex:'action',
        key:'action',
        render:(text,record) => {
          if(text===1){
            return <span>买入</span>
          }else{
            return <span>卖出</span>
          }
        } 
      },
      {
        title:'成交价格',
        dataIndex:'price',
        key:'price'
      },
      {
        title:'成交数量',
        dataIndex:'count',
        key:'count'
      },
      {
        title:'成交金额',
        dataIndex:'totalFund',
        key:'totalFund'
      },
      {
        title:'操作',
        dataIndex:'operation',
        key:'operation',
        render:(text,record) => {
          if(!record.mock){
            return <Button onClick={()=>this.handleCancel(record)}>撤销</Button>
          }
        }
      },
    ]
  }
  
  async componentDidMount(){
    const record = await http.get(`/v1/transaction/${sessionStorage.getItem('uid')}`);
    this.setState({
      tableData:record
    })
  }

  // handleCancel = async(record) => {
  //   console.log(record)
  //   http://192.168.199.125:7001/v1/user/admin?account=&admin=1
  //   //await http.delete(`/v1/transaction/${sessionStorage.getItem('uid')}`,{id:record.id})
  // }

  handleSubmit = async() => {
    const { time } = this.props.form.getFieldsValue();
    const starttime = formatTime(time[0]),
          endtime = formatTime(time[1]),
          params = {
            starttime,
            endtime
          }
    const record = await http.get(`/v1/transaction/${sessionStorage.getItem('uid')}`,{params});
    this.setState({
      tableData:record
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <>
        <Table columns={this.positionColumns}  
        rowKey={record => (record._id)} 
        scroll={{ x: 1000 }}
        dataSource={this.state.tableData} 
        rowClassName={(record, index) => record.action === 1 ? "parchaseRow" : "saleRow"}
        />
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Row> 
              <Col span={8}>
                <FormItem
                >
                  {getFieldDecorator('time', rangeConfig)(
                    <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  wrapperCol={{
                    xs: { span: 24, offset: 0 },
                    sm: { span: 16, offset: 8 },
                  }}
                >
                  <Button className='btn' type="primary" onClick={this.handleSubmit}>确认</Button>
                </FormItem>
              </Col>
            </Row>
          </Form>
      </>
    )
  }
}
export default Form.create({})(History);