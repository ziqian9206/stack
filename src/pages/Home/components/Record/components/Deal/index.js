import React, { Component } from 'react'
import { Table } from 'antd'
import moment from 'moment'
import http from '@/axios'
export default class Deal extends Component {
  constructor(props){
    super(props);
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
        dataIndex:'sum',
        key:'sum',
        render:(text, record) => {
          return <span>{record.price * record.count}</span>
        }
      },
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
    const record = await http.get(`/v1/transaction/${sessionStorage.getItem('uid')}`,{params});
    this.setState({
      dataSource:[...record]
    })
  }

  render() {
    return (
      <div>
        <Table rowKey={record => (record._id)} columns={this.positionColumns} scroll={{ x: 1000 }} dataSource={this.state.dataSource}/>
      </div>
    )
  }
}
