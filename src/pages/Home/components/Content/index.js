import React, { Component } from 'react'
import { Card } from 'antd';
import Purchase from './components/Purchase'
import Sale from './components/Sale'
import Withdraw from './components/Withdraw'
import {observer} from 'mobx-react'
import { observable } from 'mobx'
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

 @observer class Content extends Component {
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
    console.log(key, type);
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

export default Content