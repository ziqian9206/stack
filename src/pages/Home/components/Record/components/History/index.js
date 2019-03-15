import React, { Component } from 'react'
import { Table } from 'antd';
import http from '@/axios'
import moment from 'moment';
export default class History extends Component {
  constructor(props){
    super(props);
    this.state = {
      tableData:[]
    }
    this.positionColumns =[
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
        key:'action'
      },
      {
        title:'成交价格',
        dataIndex:'price',
        key:'price'
      },
      {
        title:'盈亏成本',
        dataIndex:'cost',
        key:'cost'
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
        title:'成交时间',
        dataIndex:'time',
        key:'time',
        render:text => {
          return <span key={text}>{new moment(text).format('YYYY-MM-DD,h:mm:ss a')}</span>;
        }
      },
      {
        title:'收益率',
        dataIndex:'rate',
        key:'rate'
      },
      {
        title:'交易盈亏',
        dataIndex:'earning',
        key:'earning'
      }
    ]
  }
  
  async componentDidMount(){
    const record = await http.get(`/v1/transaction/${sessionStorage.getItem('uid')}`);
    console.log(111,record.data)
    this.setState({
      tableData:record.data
    })
  }
  render() {
    return (
      <div>
        <Table columns={this.positionColumns}  rowKey={record => (record.uid)} dataSource={this.state.tableData}/>
      </div>
    )
  }
}
