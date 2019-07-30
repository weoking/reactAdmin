import React, { Component } from 'react';
import {
  Card,
  Select,
  Input,
  Button,
  Icon,
  Table
} from 'antd' 
import LinkButton from '../../components/link-button'

const Option = Select.Option
/*

Product的默认子路由组件
*/
export default class ProductHome extends Component {

  state = {
    products: [
      {

      }
    ],
  }

  /*
  初始化列的数组
  */
  initColumns = () => {
    this.columns = [
      {
        title: '商品名称',
        dataIndex:'name'
      },
      {
        title: '商品描述',
        dataIndex:'desc'
      },
      {
        title: '价格',
        dataIndex: 'price',
        render: (price) => '￥' + price // 当前制定了对应的属性，传入的是对应的属性值
      },
      {
        width:100,
        title: '状态',
        dataIndex: 'status',
        render: (status) => {

          return (
            <span>
              <Button type='primary'>下架</Button>
              <span>在售</span>
            </span>
          )
        }
      },
      {
        width:100,
        title: '状态',
        dataIndex: 'status',
        render: (products) => {

          return (
            <span>
              <LinkButton>详情</LinkButton>
              <LinkButton>修改</LinkButton>
            </span>
          )
        }
      },
    ]
  }

  componentWillMount(){
    this.initColumns()
  }

  render() { 

    //取出状态数据
    const {products} =this.state

    const title = (
      <span>
        <Select value='1' style={{width:150}}>
          <Option value='1'>按名称搜索</Option>
          <Option value='2'>按描述搜索</Option>
        </Select>
        <Input placeholder='关键字' style={{width:150,margin:'0 15px'}}/>
        <Button type='primary'>搜索</Button>
      </span>
    )

    const extra = (
      <Button type='primary'>
        <Icon type='plus'/>
        添加商品
      </Button>
    )


    return ( 
      <Card title={title} extra={extra}>
        <Table
          rowKey='_id'
          dataSource={products}
          columns={this.columns}
          bordered
        />
      </Card>
     );
  }
}