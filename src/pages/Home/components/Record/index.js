import React, { Component } from 'react'
import { Card } from 'antd';
import Position from './components/Position'
import Entrust from './components/Entrust'
import Deal from './components/Deal'
import History from './components/History'
import './index.less'
const tabList= [
  {
    key: 'history',
    tab: '历史成交',
  },
  {
    key: 'position',
    tab: '当前持仓',
  }, {
    key: 'entrust',
    tab: '当前委托',
  }, {
    key: 'deal',
    tab: '当日成交',
  }];
const contentList = {
  history:<div><History /></div>,
  position:<div><Position /></div>,
  entrust:<div><Entrust /></div>,
  deal:<div><Deal /></div>
  
};
export default class Record extends Component {
  state = {
    key: 'history',
  }

  onTabChange = (key, type) => {
    this.setState({ [type]: key });
  }
  render() {
    return (
      <Card
          className='recordCard'
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
