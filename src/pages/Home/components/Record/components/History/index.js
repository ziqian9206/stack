import React, { Component } from 'react'
import { Table } from 'antd';
export default class History extends Component {
  constructor(props){
    super(props);
    this.positionColumns =[
      {
        title:'股票名称',
        dataIndex:'name',
        key:'name'
      },
      {
        title:'股票代码',
        dataIndex:'code',
        key:'code'
      },
      {
        title:'买入/卖出',
        dataIndex:'type',
        key:'type'
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
        dataIndex:'amount',
        key:'amount'
      },
      {
        title:'成交金额',
        dataIndex:'sum',
        key:'sum'
      },
      {
        title:'成交时间',
        dataIndex:'time',
        key:'time'
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
  render() {
    return (
      <div>
        <Table columns={this.positionColumns} />
      </div>
    )
  }
}
