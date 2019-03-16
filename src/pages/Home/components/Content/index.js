import React, { Component } from 'react'
import { Card } from 'antd';
import Purchase from './components/Purchase'
import Sale from './components/Sale'
import Withdraw from './components/Withdraw'
const tabList= [ {
  key: 'purchase',
  tab: '买入',
}, {
  key: 'sale',
  tab: '卖出',
},{
  key: 'withdraw',
  tab: '撤单',
}];

export default  class Content extends Component {
  constructor(props){
    super(props)
    this.currentFund = 0
    this.contentList = {
      purchase: <div><Purchase /></div>,
      sale: <div><Sale /></div>,
      withdraw:<div><Withdraw /></div>
    };  
  }

  state = {
    key: 'purchase',
    currentFund:0
  }

  onTabChange = (key, type) => {
    this.setState({ [type]: key });
  }

  render() {
    return (
      <Card
          className ='stockContent'
          style={{ width: '100%' }}
          tabList={tabList}
          activeTabKey={this.state.key}
          onTabChange={(key) => { this.onTabChange(key, 'key'); }}
        >
          {this.contentList[this.state.key]}
        </Card>
    )
  }
}

