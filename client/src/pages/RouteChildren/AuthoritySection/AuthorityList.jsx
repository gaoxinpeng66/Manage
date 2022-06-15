import React, { useEffect, useState } from 'react'
import { Table, Tag, Switch } from 'antd';
import { reqMenuList, reqMenuUpdata } from '../../../api'
import { ListToTree } from '../../../utils/method'

const AuthorityList = () => {
  
  const [dataSource, setDataSource] = useState([])
 
  const columns = [
    {
      title: '权限名称',
      dataIndex: 'title',
      width: '20%',
      render: (title) => {
        return <b>{title}</b>
      }
    },
    {
      title: '权限路径',
      dataIndex: 'key',
      width: '20%',
      render: (key) => {
        return <Tag color="red">{key}</Tag>
      }
    },
    {
      title: '菜单级别',
      dataIndex: 'grade',
      width: '20%',
      render: (grade) => {
        if (grade === 1) {
          return <Tag color="geekblue">一级菜单</Tag>
        } else {
          return <Tag color="green">二级菜单</Tag>
        }
      }
    },
    {
      title: '状态',
      width: '10%',
      render: (item) => {
        if (item.state === 1) {
          return <Switch defaultChecked onChange={() => onChange(item)} />
        } else {
          return <Switch onChange={() => onChange(item)} />
        }
      }
    },
  ];

  useEffect(() => {
    getMenuList()
  }, [])

  const onChange = (item) => {
    if (item.state === 1) {
      if (item.children) {
        reqMenuUpdata(item._id, item.state = 0)
        item.children.map((item2) => {
          return onChange(item2)
        })
      } else {
        reqMenuUpdata(item._id,item.state = 0)
      }
    } else {
      if (item.children) {
        reqMenuUpdata(item._id, item.state= 1)
        item.children.map((item2) => {
          return onChange(item2)
        })
      } else {
        reqMenuUpdata(item._id, item.state= 1)
      }
    }
  }

  const getMenuList = async()=>{
    await reqMenuList().then(res => {
      const newRes = ListToTree(res.data)
      setDataSource(newRes)
    })
  }

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      pagination={{
        pageSize: 5
      }}
    />
  )
}

export default AuthorityList