import React, { Component } from 'react'
import { Table } from 'antd';

export default class Entrust extends Component {
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
        title:'委托价格',
        dataIndex:'price',
        key:'price'
      },
      {
        title:'委托数量',
        dataIndex:'amount',
        key:'amount'
      },
      {
        title:'委托时间',
        dataIndex:'time',
        key:'time'
      },
      {
        title:'成交状态',
        dataIndex:'status',
        key:'status'
      },
      {
        title:'操作',
        dataIndex:'opertion',
        key:'opertion'
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
