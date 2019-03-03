import React, { Component } from 'react'
import './index.less'
import CountInfo from './components/CountInfo/'
import Content from './components/Content/'
import Record from './components/Record/'
import fundStore from '../../store/fund';
import {observer} from 'mobx-react'
import { observable } from 'mobx'
class FundStore{
  @observable data = {
    data:{
      init:0,
      current:0
    }
  }
}
@observer class Home extends Component {
  constructor(props){
    super(props)
    this.fundStore = new FundStore()
  }
  async getInfo(){
    await fundStore(this.fundStore)
  }
  
  componentDidMount(){
    this.getInfo()
  }
  render() {
    return (
      <div className="home-wrap">
        <CountInfo initFund={this.fundStore.data.init} currentFund = {this.fundStore.data.current}/>
        <Content initFund={this.fundStore.data.init} currentFund = {this.fundStore.data.current} />
        <Record />
      </div>
    )
  }
}
export default Home