import React, { Component } from 'react'
import './index.less'
import CountInfo from './components/CountInfo/'
import Content from './components/Content/'
import Record from './components/Record/'
import http from '../../axios/index'
export default class Home extends Component {
  state = {
    key: 'purchase',
    init:0,
    current:0,
    stocks:[]
  }
  async getInfo(){
    const info = await http.get(`/v1/user/${sessionStorage['uid']}`)
    this.setState({
      ...info.data
    })
  }
  
  componentDidMount(){
    this.getInfo()
  }
  render() {
    const info = this.state
    return (
      <div className="home-wrap">
        <CountInfo fund={info} />
        <Content />
        <Record />
      </div>
    )
  }
}
