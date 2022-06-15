import React, { useEffect, useState } from 'react'
import {
  Table,
  Tag,
} from "antd";
import {
    reqRegisterList,
} from '../../../api'

const RegisterList = (props) => {
  const [dataSource, setDataSource] = useState([])
  const [departmentList, setDepartmentList] = useState([])
  const [userList, setUserList] = useState([])

  const getRegisterList = () => {
    reqRegisterList().then(res => {
      const newDegister = res.data.register
      const newDepartment = res.data.department
      const newUser = res.data.user
      setDataSource(newDegister)
      setDepartmentList(newDepartment)
      setUserList(newUser)
    }).catch(err => {
      console.log(err);
    })
  }
  useEffect(() => {
    getRegisterList()
  }, [])


  const columns = [
    {
      title: '患者姓名',
      dataIndex: 'name',
      render: (name, item) => {
        return <a href={`/patient/outpatient/detail/${item._id}`} > <b>{ name }</b></a >
      }
    },
    {
      title: '挂号科室',
      dataIndex: 'departmentId',
      render: (departmentId) => {
        let result = departmentList.find((item) => {
          return item._id === departmentId
        })
        return <b>{result.name} </b>
      }
    },
    {
        title: '门诊医生',
        dataIndex: 'userId',
        render: (userId) => {
          let result = userList.find((item) => {
            return item._id === userId
          })
          return <b>{result.name} </b>
        }
      },
    {
      title: '性别',
      dataIndex: 'sex',
      render: (sex) => {
        if (sex === '0') {
          return <Tag color="geekblue">男</Tag>
        } else {
          return <Tag color="green">女</Tag>
        }
      }
    },
    {
      title: '年龄',
      dataIndex: 'age',
    },
    {
      title: '预约时间',
      dataIndex: 'date',
      render: (date) => {
        return <Tag color="#1890ff">{date}</Tag>
      }
    },
    {
      title: '家庭地址',
      dataIndex: 'address',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '体检状态',
      dataIndex: 'state',
      render: (state) => {
        if (state === 0) {
          return <Tag color="geekblue">待诊断</Tag>
        } else if(state === 1){
          return <Tag color="green">待检验</Tag>
        }else if(state === 2){
            return <Tag color="rgb(24, 144, 255)">已检验</Tag>
        }else {
            return <Tag color="red">已诊断</Tag>
        }
      }
    },
    {
      title: '检验医生',
      dataIndex: 'user',
      render: (user) => {
        if (user.trim() === '') {
          return <span>暂无医生检验</span>
        } else {
          return <span>{user}</span>

        }
      }
    },
  ];

  return (
    <>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(item) => item._id}
        pagination={{
          pageSize: 5
        }}
      />
    </>
  )
}

export default RegisterList