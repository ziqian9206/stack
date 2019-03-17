import React, { Component } from 'react'
import './index.less'
import CountInfo from './components/CountInfo/'
import Content from './components/Content/'
import Record from './components/Record/'
import {getInit,getPosition} from '../../redux/action'
import {connect} from 'react-redux'
import Position from './components/Record/components/Position';
class Home extends Component {
  constructor(props){
    super(props)
  }
  
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