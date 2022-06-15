import React, { useState } from 'react'
import { Layout, Menu, Dropdown, Space } from 'antd';
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  DownOutlined
} from '@ant-design/icons';
const { Header } = Layout;

const TopHeader = (props) => {
  
  const menu = (
    <Menu
      onClick={(e) => {
        if (e.key === '2') {
          localStorage.removeItem("user")
          localStorage.removeItem("token")
          props.history.replace("/login")
        }else {
          props.history.replace("/personal")
        }
      }}
      items={[
        {
          key: '1',
          label: '个人中心',
        },
        {
          key: '2',
          label: '退出登录',
          danger: true,

        },

      ]}
    />
  );
const user =  JSON.parse(localStorage.getItem("user"))

  return (
    <Header className="site-layout-background" style={{ padding: '0 16px' }}>
      
      <div style={{ float: 'right' }}>
        <UserOutlined style={{ marginRight: '8px' }} />
        <span>{user.roleId.name} <span style={{color:"#1890ff"}}>{user.name}</span></span>
        <Dropdown overlay={menu}>
          <span onClick={e => e.preventDefault()} style={{ color: 'red' }}>
            <Space style={{ marginLeft: '8px' }}>
              设置
              <DownOutlined />
            </Space>
          </span>
        </Dropdown>
      </div>
    </Header>
  )
}
export default withRouter(TopHeader)