import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom'
import { Menu, Icon } from 'antd';

import logo from '../../assets/images/logo.png'
import menuList from '../../config/menuConfig'
import './index.less'

const { SubMenu } = Menu;
/*
左侧导航的组件
*/
class LeftNav extends Component {

  /*
  根据menu的数据数组生成对应的标签数组
  使用map()+递归调用
  */
  getMenuNodes_map = (menuList) => {
    return menuList.map(item => {
      if(!item.children) {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
          )}
      return (
        <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes(item.children)}
          </SubMenu>
      )
    })
  } 

  /*
  根据menu的数据数组生成对应的标签数组
  使用reduce()+递归调用
  */
  getMenuNodes = (menuList) => {
    // 得到当前请求的路由路径
    const path = this.props.location.pathname

    return menuList.reduce((pre,item)=>{
      // 向pre添加<Menu.Item>
      if(!item.children) {
        pre.push((
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        ))
      } else{

        //查找一个与当前请求路径匹配的子Item
        const cItem = item.children.find(cItem => cItem.key === path)
        //如果存在，说明当前item的字列表需要打开
        if (cItem) {
          this.openKey = item.key
        }
        // 向pre添加<SubMenu>
        pre.push((
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes(item.children)}
          </SubMenu>
        ))
      }
      return pre
    },[])
  }

  /*
  在第一次render()之前执行一次
  在第一次render()准备(必须同步的)
  */
  componentWillMount() {
    this.menuNodes = this.getMenuNodes(menuList)
  }
  render() { 

    // 得到当前请求的路由路径
    const path = this.props.location.pathname
    //得到需要打开菜单项的key
    const openKey = this.openKey

    return ( 
      <div to="/" className="left-nav"> 
        <Link to='/' className="left-nav-header">
          <img src={logo} alt="logo"></img>
          <h1>硅谷后台</h1>
        </Link>
        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[path]}
          defaultOpenKeys={[openKey]}
        >

          {
            this.menuNodes
          }

        </Menu>
      </div>
     );
  }
}

/*
withRouter高阶组件：
包装非路由组件，返回一个新的组件
新的组件向非路由组件传递三个属性：location/history/match
*/
export default withRouter(LeftNav)
 