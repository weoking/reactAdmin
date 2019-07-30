import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import {Modal} from 'antd'

import { reqWeather } from '../../api'
import menuList from '../../config/menuConfig.js'
import { formateDate } from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import LinkButton from '../../components/link-button'
import './index.less'

 class Header extends Component {
  state = { 
    currentTime: formateDate(Date.now()),
    dayPictureUrl: '',
    weather: ''
  }
  
  getTime = () => {
    //每隔1s获取当时时间，并更新状态数据currentTime
    this.interValidId = setInterval(() => {
      const currentTime = formateDate(Date.now())
      this.setState({currentTime})
    },1000)
  }

  getWeather = async () => {
    //调用接口请求异步获取数据
    const { dayPictureUrl, weather } = await reqWeather('武汉')
    this.setState({dayPictureUrl, weather})
  }

  getTitle = () => {
    const path = this.props.location.pathname
    let title
    menuList.forEach(item => {
      if (item.key === path) { //如果当前item对象的key与path一样，item的title就是需要显示的title
        title = item.title
      } else if (item.children) {
        //在所有的子item中查找匹配的
        const cItem = item.children.find(cItem => cItem.key === path)
        //如果有值才说明有匹配的
        if (cItem) {
          title = cItem.title
        }
      }
    })
    return title
   }
   
   /*
   退出
   */
   Logout = () => {

    Modal.confirm({
      content: '确定退出吗？',
      onOk: () => {
        //console.log('OK');
        // 删除保存的user数据
        storageUtils.removeUser()
        memoryUtils.user = {}

        //跳转到Login
        this.props.history.replace('./login')
      }
    })
   }
  /*
  第一次render()之后执行一次
  一般在此执行异步操作：发ajax请求/启动定时器
  */
  componentDidMount() {
    // 获取当前时间
    this.getTime()
    //获取天气
    this.getWeather()
   }

   /*
   当前组建卸载之前调用
   */
   componentWillUnmount() {
    // 清除定时器
     clearInterval(this.interValidId)
   }

  render() { 
    const { currentTime, dayPictureUrl, weather } = this.state
    
    const username = memoryUtils.user.username

    //得到当前需要显示的title
    const title = this.getTitle()

    return ( 
      <div className="header">
        <div className="header-top">
          <span>欢迎，{username}</span>
          <LinkButton onClick={this.Logout}>退出</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <span>{currentTime}</span>
            <img src={dayPictureUrl} alt="weather"/>
            <span>{weather}</span>
          </div>
        </div>
      </div>
     );
  }
}
 
export default withRouter(Header)