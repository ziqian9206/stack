import React, { Component } from 'react'
import { Row,Col } from 'antd';
import Header from './components/Header'
import Footer from './components/Footer'
import Nav from './components/Nav'
import './style/common.less'

export default class Admin extends Component {
  render() {
    return (
      <Row className="container">
          <Col span="3" className="nav-left">
            <Nav />
          </Col>
          <Col span="21" className="main">
            <Header />
            <Row className="content">
                {this.props.children} 
            </Row>
            <Footer />
          </Col>
      </Row>
    )
  }
}
