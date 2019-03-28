import React, { Component } from 'react'
import './index.less'
import CountInfo from './components/CountInfo/'
import Content from './components/Content/'
import Record from './components/Record/'
import {getInit} from '../../redux/action'
import {connect} from 'react-redux'

class Home extends Component {
  
  componentDidMount(){
    const { dispatch } = this.props;
    const initAction = getInit()
    dispatch(initAction)
  }

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

export default connect()(Home)