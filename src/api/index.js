

/*
根据接口文档定义接口请求
包含应用中所有接口请求函数的模块
每个函数的返回值都是promise

能根据接口文档编写接口请求函数
*/
import jsonp from 'jsonp'
import ajax from "./ajax";
import { message } from 'antd';

const BASE = ''
// 登陆
// export function reqLogin(username,password) {
//   return ajax('/login',{username,password},'POST')
// }
export const reqLogin = (username, password) => ajax(BASE + '/login', { username, password }, 'POST')

// 添加用户
export const reqAddUser = (user) => ajax(BASE + '/manage/user/add', user, 'POST')

//获取一级/二级分类的列表
export const reqCategorys = (parentId) => ajax(BASE + '/manage/category/list', { parentId })
//添加分类
export const reqAddCategory = (categoryName, parentId) => ajax(BASE + '/manage/category/add', { categoryName, parentId }, 'POST')
//更新分类
export const reqUpdateCategory = ({ categoryId, categoryName }) => ajax(BASE + '/manage/category/update', { categoryId, categoryName }, 'POST')
/*
jsonp请求的接口请求函数
*/
export const reqWeather = (city) => {

  return new Promise((resolve, reject) => {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    // 发送jsonp请求
    jsonp(url, {}, (err, data) => {
      console.log('jsonp()', err, data)
      //如果成功了
      if (!err && data.status === 'success') {
        const { dayPictureUrl, weather } = data.results[0].weather_data[0]
        resolve({dayPictureUrl, weather})
      } else {
        //如果失败了
        message.error('获取天气数据失败')
      }
    })
  })
}