//当前持仓
import React, { Component } from 'react'
import { Table, Spin,Button } from 'antd';
import {connect} from 'react-redux'
import http from '@/axios'
import {getPosition, getStock} from '@/redux/action'
import {toDecimal} from '@/utils/util'
class Position extends Component {
  constructor(props){
    super(props);

    this.positionColumns = [
      {
        title:'股票名称',
        dataIndex:'name',
        key:'name'
      },
      {
        title:'股票代码',
        dataIndex:'sid',
        key:'sid',
      },
      {
        title:'当前持股',
        dataIndex:'hold',
        key:'hold'
      },
      {
        title:'最新价',
        dataIndex:'current',
        key:'current'
      },
      // {
      //   title:'今日涨幅',
      //   dataIndex:'rate',
      //   key:'rate'
      // },
      {
        title:'浮动盈亏',
        dataIndex:'totalFund',
        key:'totalFund',
        render:(text,record)=>{
          if(text>0){
            return <span color="red">{text}</span>
          }else{
            return <span style={{color:'blue'}}>{text}</span>
          }
          
        }
      },
      // {
      //   title:'盈亏比例',
      //   dataIndex:'profitRatio',
      //   key:'profitRatio'
      // },
      // {
      //   title:'持仓占比',
      //   dataIndex:'positionRate',
      //   key:'positionRate',
      //   render : (text,record) => {
      //     const positionRate = (record.current * record.hold /this.props.initData.current).toFixed(2)
      //     return <span>{positionRate}</span>
      //   }
      // }
    ]
  }

  state = { 
    loading : true,
    dataSource : []
   }

//1.position => 2.遍历position拿到sid 3.拿sid请求数据 4.修改数据 5.返回
//浮动盈亏：现在价格-开盘价格
//盈亏比例：（现在价格-买入）/买入
  async componentDidMount(){
    const position = await http.get(`/v1/stock/hold/${sessionStorage.getItem('uid')}`);
    position.map( async item => {
      const info = await http.get(`/v1/stock/${item.sid}`)
      item.totalFund = (info.currentPrice*item['hold']+ item.earning).toFixed(2)
      item['current'] = toDecimal(info.currentPrice)//
      item['yesterdayEnd'] = info.yesterdayEnd
      item['rate'] = ((info.currentPrice- item['yesterdayEnd']) / item['yesterdayEnd']).toFixed(2)
      this.setState({
        dataSource:this.state.dataSource.concat(item),
      })
    })
    this.setState({
      loading:false
    })
  }

  render() {
    return (
      <>
        <Spin spinning={this.state.loading}>
          <Table columns={this.positionColumns} rowKey={record => (record._id)} scroll={{ x: 1000 }} dataSource={ this.state.dataSource }
           rowClassName={(record, index) => record.totalFund >0 ? "profitRow" : "lossRow"}/>
        </Spin>
      </>
    )
  }
}


const mapstatetoprops = state =>{
  return{
    initData :state.initData,
    position :state.position,
    stockData : state.stockData
  }
}

export default connect(mapstatetoprops)(Position)
