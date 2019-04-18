import React, { Component } from 'react'
import CountInfo from '../Home/components/CountInfo/'
import Record from '../Home/components/Record/'
import {getInit} from '@/redux/action'
import {connect} from 'react-redux'
class Custom extends Component {
  componentDidMount(){
    const { dispatch } = this.props;
    const initAction = getInit()
    dispatch(initAction)
  }
  render() {
    return (
      <div>
        <CountInfo />
        <Record />
      </div>
    )
  }
}
export default connect()(Custom)