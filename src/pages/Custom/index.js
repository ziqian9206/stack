import React, { Component } from 'react'
import CountInfo from '../Home/components/CountInfo/'
import Record from '../Home/components/Record/'

export default class Custom extends Component {
  render() {
    return (
      <div>
        <CountInfo />
        <Record />
      </div>
    )
  }
}
