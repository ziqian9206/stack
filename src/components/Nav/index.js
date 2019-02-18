import React, { Component } from 'react'
import MenuConfig from '../../config/menuConfig'
import {Link} from 'react-router-dom'
import {Menu,Icon} from 'antd'
import './index.less'
const SubMenu = Menu.SubMenu;
export default class Nav extends Component {
  componentWillMount(){
    const menuTreeNode = this.renderMenu(MenuConfig);
    this.setState({
      menuTreeNode
    })
  }
  //菜单渲染
  renderMenu=(data)=>{
    return data.map((item)=>{
      if(item.children){
        return (
          <SubMenu title={item.title} key={item.key}>
            {this.renderMenu(item.children)}
          </SubMenu>
        )
      }
      return <Menu.Item title={item.title} key={item.key}><Link to={item.key}>{item.title}</Link></Menu.Item>
    })
  }
  render() {
    return (
      <div>
        <div className='logo'>
          <h1>模拟炒股</h1>
        </div>
        <Menu theme="dark">
          {this.state.menuTreeNode}
        </Menu>
      </div>
    )
  }
}
