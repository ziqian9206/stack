//当前持仓
import React, { Component } from 'react'
import { Table } from 'antd';
import {connect} from 'react-redux'
import {getPosition} from '../../../../../../redux/action'
import http from '../../../../../../axios'

class Position extends Component {
  constructor(props){
    super(props);
    
    this.positionColumns = [
      {
        title:'股票名称',
        dataIndex:'sname',
        key:'sname'
      },
      {
        title:'股票代码',
        dataIndex:'sid',
        key:'sid',
      },
      {
        title:'当前持股',
        dataIndex:'count',
        key:'count'
      },
      {
        title:'最新价',
        dataIndex:'current',
        key:'current',
        render:(text,record)=>{
          return <span>{record.current}</span>
        }
      },
      {
        title:'今日涨幅',
        dataIndex:'rate',
        key:'rate'
      },
      {
        title:'浮动盈亏',
        dataIndex:'totalFund',
        key:'totalFund'
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
      }
    ]
  }

  state = {
      dataSource:[]
  }
  // componentDidMount(){
  //   const { dispatch } = this.props;
  //   const action = getPosition()
  //   dispatch(action)
  // }
  componentDidMount(){
    http.get(`/v1/stock/hold/${sessionStorage.getItem('uid')}`)
        .then(res => {
          res.map( async item => {
            const info = await http.get(`/v1/stock/${item.sid}`)
            item['current'] = Number(info.currentPrice)
            item['yesterdayEnd'] = info.yesterdayEnd
            item['rate'] = (item['current']- item['yesterdayEnd']) / item['yesterdayEnd']
          })
          this.setState({
            dataSource:[...res]
          })
    });  
  }
  render() {
    return (
      <div>
       <Table columns={this.positionColumns} rowKey={record => (record._id)} dataSource={this.state.dataSource}/>
      </div>
    )
  }
}
const mapstatetoprops = state =>{
  return{
    position :state.position
  }
}
export default connect(mapstatetoprops)(Position)
