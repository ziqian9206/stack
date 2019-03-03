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
const contentList = {
  purchase: <div><Purchase /></div>,
  sale: <div><Sale /></div>,
  withdraw:<div><Withdraw /></div>
};
export default class index extends Component {
  state = {
    key: 'purchase',
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
          {contentList[this.state.key]}
        </Card>
    )
  }
}
