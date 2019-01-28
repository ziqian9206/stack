import React, { Component } from 'react'
import {Row,Col} from 'antd' 
import moment from 'moment';
import './index.less'
export default class Header extends Component {
  state={
    username:'wzq',
    timer:''
  }
  componentDidMount(){
    setInterval(()=>{
      let timer = moment().format()
      this.setState({
        timer
      })
    },1000)
  }
  render() {
    return (  
      <div className="header">
        <Row className="header-top">
          <Col span="24">
            <span>欢迎,{this.state.username}</span>
            <a href="#">退出</a>
          </Col>
        </Row>
        <Row className='breadcrumb'>
          <Col span="4" className='breadcrumb-title'>
            首页
          </Col>
          <Col span="20"  className='date'> 
            <span>{this.state.timer}</span>
          </Col>
        </Row>
     </div>
    )
  }
}
