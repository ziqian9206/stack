import React, { Component } from 'react'
import {Row,Col} from 'antd' 
import moment from 'moment';
import {connect} from 'react-redux'
import './index.less'
class Header extends Component {
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
    const { menuName} = this.props;
    return (  
      <div className="header">
        <Row className="header-top">
          <Col span={24}>
            <span>欢迎,{sessionStorage.getItem('account')}</span>
            <a href="/login">退出</a>
          </Col>
        </Row>
        <Row className='breadcrumb'>
          <Col span={4} className='breadcrumb-title'>
            {menuName || "首页"}
          </Col>
          <Col span={20}  className='date'> 
            <span>{this.state.timer}</span>
          </Col>
        </Row>
     </div>
    )
  }
}
//connect中回调方法，数据源对象,menuName存到属性,事件派发，这边组件保存
const mapstatetoprops = state =>{
  return{
    menuName :[state.menuName]
  }
}
export default connect(mapstatetoprops)(Header)