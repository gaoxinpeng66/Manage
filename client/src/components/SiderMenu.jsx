import React, { useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Layout, Menu } from 'antd';
import { ListToTree } from '../utils/method'
import { reqMenuList } from '../api'
const { Sider } = Layout;

const SiderMenu = (props) => {

  const [menu, setMenu] = useState([])
  const selectKeys = [props.location.pathname]
  const openKeys = ['/' + props.location.pathname.split('/')[1]]
  const { roleId } = JSON.parse(localStorage.getItem("user"))
  const getMenuList =  async() => {
    reqMenuList().then(res => {
     let newRes = ListToTree(res.data)
     setMenu(newRes)
   })
  
 }

 useEffect(() => {
   getMenuList()
 }, [])
  const checkPageState = (item) => {
    return item.state === 1 && roleId.menus.includes(item.key)
  }

  const menuLists = (menuList) => {
    return menuList.map(item => {
      if (item.children?.length > 0 && checkPageState(item)) {
        return <Menu.SubMenu key={item.key} title={item.title}>
            {menuLists(item.children)}
          </Menu.SubMenu>
        
      }
      return (
        checkPageState(item) && <Menu.Item key={item.key}>
          <Link to={item.key}>
            {item.title}
          </Link>
        </Menu.Item>
      )
    })
  }


  return (
    <Sider trigger={null} collapsible >
      <div style={{ display: "flex", height: '100%', flexDirection: "column" }} >
        <div className="logo" >
          医疗健康后台管理系统
        </div>
        <div style={{ flex: '1', overflow: "auto" }}>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={selectKeys}
            defaultOpenKeys={openKeys}
          >
            {
              menuLists(menu)
            }
          </Menu>
        </div>
      </div>
    </Sider>
  )
}

export default withRouter(SiderMenu)