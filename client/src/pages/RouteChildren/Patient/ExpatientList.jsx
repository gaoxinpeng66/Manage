import React, { useEffect, useState } from 'react'
import {
  Table,
  Tag,
} from "antd";
import {
  reqPatientList,
} from '../../../api'

const ExpatientList = (props) => {
  const [dataSource, setDataSource] = useState([])
  const [projectList, setProjectList] = useState([])

  const getExpatientList = () => {
    reqPatientList().then(res => {
      const newPatientt = res.data.patient
      const newProject = res.data.project
      setDataSource(newPatientt)
      setProjectList(newProject)
    }).catch(err => {
      console.log(err);
    })
  }
  useEffect(() => {
    getExpatientList()
  }, [])


  const columns = [
    {
      title: '患者姓名',
      dataIndex: 'name',
      render: (name, item) => {
        return <a href={`/patient/examine/detail/${item._id}`} > <b>{ name }</b></a >
      }
    },
    {
      title: '体检项目',
      dataIndex: 'projectId',
      render: (projectId) => {
        let result = projectList.find((item) => {
          return item._id === projectId
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
      title: '紧急联系人',
      dataIndex: 'emergency',
    },
    {
      title: '体检状态',
      dataIndex: 'state',
      render: (state) => {
        if (state === 0) {
          return <Tag color="geekblue">未体检</Tag>
        } else {
          return <Tag color="green">已体检</Tag>
        }
      }
    },
    {
      title: '检查医生',
      dataIndex: 'user',
      render: (user) => {
        if (user.trim() === '') {
          return <span>暂无医生体检</span>
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

export default ExpatientList