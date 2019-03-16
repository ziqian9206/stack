import React, { Component } from 'react'
import MenuConfig from '../../config/menuConfig'
import {Link} from 'react-router-dom'
import {Menu,Icon} from 'antd'
import './index.less'
import {connect} from 'react-redux'
import {switchMenu} from './../../redux/action/index'
const SubMenu = Menu.SubMenu;
 class Nav extends Component {
  state={
    currentKey:''
  }
  // 菜单点击
  handleClick = ({ item, key }) => {
    if (key == this.state.currentKey) {
        return false;
    }
    // 事件派发，自动调用reducer，通过reducer保存到store对象中
    const { dispatch } = this.props;
    dispatch(switchMenu(item.props.title));
    this.setState({
        currentKey: key
    });
    // hashHistory.push(key);
};
  componentWillMount(){
    const menuTreeNode = this.renderMenu(MenuConfig);
    let currentKey = window.location.hash.replace(/#|\?.*$/g,'');
    this.setState({
      currentKey,
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
          <h1>炒股</h1>
        </div>
        <Menu 
          onClick = {this.handleClick}
          selectedKeys={[this.state.currentKey]}
          theme="dark"
        >
          {this.state.menuTreeNode}
        </Menu>
      </div>
    )
  }
}

export default connect()(Nav)