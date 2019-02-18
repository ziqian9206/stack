import React, { Component } from 'react'
import { Card } from 'antd';
import Stack from './components/Stack'
import Purchase from './components/Purchase'
import Sale from './components/Sale'
import Withdraw from './components/Withdraw'
const tabList= [{
  key: 'stack',
  tab: '资金股票',
}, {
  key: 'purchase',
  tab: '买入',
}, {
  key: 'sale',
  tab: '卖出',
},{
  key: 'withdraw',
  tab: '撤单',
}];
const contentList = {
  stack: <div><Stack /></div>,
  purchase: <div><Purchase /></div>,
  sale: <div><Sale /></div>,
  withdraw:<div><Withdraw /></div>
};
export default class index extends Component {
  state = {
    key: 'stack',
  }

  onTabChange = (key, type) => {
    console.log(key, type);
    this.setState({ [type]: key });
  }
  render() {
    return (
      <Card
          className ='stackContent'
          style={{ width: '100%' }}
          tabList={tabList}
          activeTabKey={this.state.key}
          onTabChange={(key) => { this.onTabChange(key, 'key'); }}
        >
          {contentList[this.state.key]}
        </Card>
    )
  }
}
