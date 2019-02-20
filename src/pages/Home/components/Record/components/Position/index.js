//当前持仓
import React, { Component } from 'react'
import { Table } from 'antd';

export default class Position extends Component {
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
        title:'当前持股',
        dataIndex:'shareholding',
        key:'shareholding'
      },
      {
        title:'最新价',
        dataIndex:'price',
        key:'price'
      },
      {
        title:'今日涨幅',
        dataIndex:'increase',
        key:'increase'
      },
      {
        title:'浮动盈亏',
        dataIndex:'float',
        key:'float'
      },
      {
        title:'盈亏比例',
        dataIndex:'profitRatio',
        key:'profitRatio'
      },
      {
        title:'持仓占比',
        dataIndex:'positionRate',
        key:'positionRate'
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
