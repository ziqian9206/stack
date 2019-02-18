import React, { Component } from 'react'
import './index.less'
import CountInfo from './components/CountInfo/'
import Content from './components/Content/'
import Record from './components/Record/'
export default class Home extends Component {
  render() {
    return (
      <div className="home-wrap">
        <CountInfo />
        <Content />
        <Record />
      </div>
    )
  }
}
