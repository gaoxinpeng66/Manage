import React from 'react'
import { Layout } from 'antd';
import SiderMenu from '../../components/SiderMenu'
import TopHeader from '../../components/TopHeader'
import HomeRoute from '../../components/HomeRoute'
import './home.css'
const { Content } = Layout;

const Home = () => {

  return (
    <Layout>
      <SiderMenu></SiderMenu>
      <Layout className="site-layout">
        <TopHeader></TopHeader>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}>
            <HomeRoute />
        </Content>
      </Layout>
    </Layout>
  )
}

export default Home