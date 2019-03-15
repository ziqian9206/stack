import React, { Component } from 'react'
import './index.less'
import CountInfo from './components/CountInfo/'
import Content from './components/Content/'
import Record from './components/Record/'
import {getInit} from '../../redux/action'
import {connect} from 'react-redux'
class Home extends Component {
  constructor(props){
    super(props)
    
  }
  
  componentDidMount(){
    const { dispatch } = this.props;
    const action = getInit()
    dispatch(action)
    console.log(action)
  }
  render() {
    return (
      <div className="home-wrap">
        <CountInfo initFund={123} currentFund = {123}/>
        <Content initFund={123} currentFund = {123} />
        <Record />
      </div>
    )
  }
}
export default connect()(Home)