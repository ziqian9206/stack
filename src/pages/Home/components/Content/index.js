import React, { Component } from 'react'
import { Card ,Button,Drawer} from 'antd';
import Purchase from './components/Purchase'
import Sale from './components/Sale'
import http from '../../../../axios'
const tabList= [ {
  key: 'purchase',
  tab: '买入',
}, {
  key: 'sale',
  tab: '卖出',
}];

export default  class Content extends Component {
  constructor(props){
    super(props)
    this.currentFund = 0
    this.contentList = {
      purchase: <div><Purchase /></div>,
      sale: <div><Sale /></div>,
    };  
  }

  state = {
    key: 'purchase',
    currentFund:0
  }

  onTabChange = (key, type) => {
    this.setState({ [type]: key });
  }
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  handleAcount = async() => {
    const account= await http.get('/v1/user/generator');
    this.setState({
      account:account.account,
      password:account.password
    }, this.showDrawer())
//     account: "bd883518-a5f8-4367-acba-09d7e6214bd2"
// password: "f6e9d151-7a27-4496-87ef-4875e88e6c32"
  }

  render() {
    return (
      <Card
          className ='stockContent'
          style={{ width: '100%' }}
          tabList={tabList}
          activeTabKey={this.state.key}
          onTabChange={(key) => { this.onTabChange(key, 'key'); }}
          extra={ <div>
            <Button type="primary" onClick={this.handleAcount}>
              生成子账号
            </Button>
            <Drawer
              title="子账户账号密码"
              placement="right"
              closable={false}
              onClose={this.onClose}
              visible={this.state.visible}
            >
              <p>账号：{this.state.account}</p>
              <p>密码：{this.state.password}</p>
            </Drawer>
          </div>}
        >
          {this.contentList[this.state.key]}
        </Card>
    )
  }
}

