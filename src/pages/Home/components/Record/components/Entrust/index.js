import React, { Component } from 'react'
import { Table, Button } from 'antd';
import http from '@/axios'
import moment from 'moment'
export default class Entrust extends Component {
  constructor(props){
    super(props);
    this.positionColumns =[
      {
        title:'委托日期',
        dataIndex:'time',
        key:'date',
        render:text => {
          return <span key={text}>{new moment(text).format('YYYY-MM-DD')}</span>;
        }
      },
      {
        title:'委托时间',
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
        title:'委托价格',
        dataIndex:'price',
        key:'price'
      },
      {
        title:'委托数量',
        dataIndex:'count',
        key:'count'
      },
      {
        title:'成交状态',
        dataIndex:'status',
        key:'status',
        render:(text,record) => {
          if(text===1){
            return <span>成交</span>
          }else{
            return <span>委托</span>
          }
        } 
      },
      // {
      //   title: '操作',
      //   dataIndex: 'operator',
      //   fixed: 'right',
      //   width: 100,
      //   render: (text, record) => (
      //      <Button onClick={()=>{this.onOperatorClick(record)}}>撤销</Button>
      //   )
      // }
    ]
  }

  state = { 
    dataSource : []
  }

  async componentDidMount(){
    //v1/stock/commission/:uid?starttime=&endtime=
    const nowDate = new Date().getTime()
    const todayDate = moment().startOf('day').toDate().getTime()
    const params = {
      starttime:todayDate,
      endtime:nowDate
    }
    const commission = await http.get(`v1/stock/commission/${sessionStorage.getItem('uid')}`,{params})
    this.setState({
      dataSource:[...commission]
    })
  }

  onOperatorClick = async(record) => {
    const data = []
    await http.get(`/v1/stock/commission/revoke/${record._id}`)
    this.state.dataSource.map(( item ) => {
      if(item._id !== record._id){
        data.push(item)
      }
      return item
    })
    this.setState({
      dataSource:[...data]
    })
    window.location.href = '/home'
  }
  render() {
    return (
      <div>
        <Table rowKey={record => (record._id)} scroll={{ x: 1000 }} columns={this.positionColumns} dataSource={this.state.dataSource}/>
      </div>
    )
  }
}
