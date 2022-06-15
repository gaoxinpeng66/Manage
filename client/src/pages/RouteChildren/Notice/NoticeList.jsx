import React, { useEffect, useState } from 'react'
import {
  Button,
  Modal,
  Table,
  Tag,
} from "antd";
import {
  ExclamationCircleOutlined,
  QuestionCircleOutlined
} from "@ant-design/icons";
import {
  reqNoticeList,
  reqNoticeDelete,
  reqNoticUpdata
} from '../../../api'
import dayjs from "dayjs";
const { confirm } = Modal

const NoticeList = () => {

  const [dataSource, setDataSource] = useState([])

  const columns = [
    {
      title: '公告标题',
      dataIndex: 'title',
      render: (title, item) => {
        return <a href={`/notice/detail/${item._id}`} > <b>{ title }</b></a >
      }
    },
    {
      title: '发布人',
      dataIndex: 'user',
      render: (key) => {
        return <Tag color="#FF7F50">{key}</Tag>
      }
    },
    {
      title: '发布时间',
      dataIndex: 'createdAt',
      render: (createdAt) => {
        return <Tag color="orange">{dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss')}</Tag>
      }
    },
    {
      title: '发布状态',
      dataIndex: 'condition',
      render: (condition) => {
        return condition === 0 ? <Tag color="red">待发布</Tag> : <Tag color="rgb(24, 144, 255)">已发布</Tag>
      }
    },
    {
      title: '操作',
      align: 'center',
      render: (item) => {
        return <div>
          <Button type="link" danger onClick={() => confimMethod(item)}>删除</Button>
          <Button type="link" disabled={item.condition === 1} onClick={() => changeConfimMethod(item)}>发布</Button>
        </div >
      },
    },
  ];
  const confimMethod = async (item) => {
    confirm({
      title: '你确定删除吗？',
      icon: <QuestionCircleOutlined style={{ color: 'red' }} />,
      okText: '确认',
      cancelText: '取消',
      onOk() {
        deleteNotice(item)
      },
      onCancel() {
        console.log('onCancel');
      }
    })
  }
  const changeConfimMethod = async (item) => {
    confirm({
      title: '你确定发布吗？',
      icon: <ExclamationCircleOutlined />,
      okText: '确认',
      cancelText: '取消',
      onOk() {
        updataNotice(item)
      },
      onCancel() {
        console.log('onCancel');
      }
    })
  }

  useEffect(() => {
    getNoticeList()
  }, [])

  const getNoticeList = () => {
    reqNoticeList().then(res => {
      const newList = res.data.filter((item) => item.state === 1)
      setDataSource(newList)
    })
  }
  const updataNotice = (item) => {
    reqNoticUpdata(item._id, item.condition = 1).then(res => {
      getNoticeList()
    })
  }

  const deleteNotice = async (item) => {
    await reqNoticeDelete(item._id, item.state = 0).then(res => {
      console.log(res.data);
      getNoticeList()
    })
  }

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={(item) => item._id}
      pagination={{
        pageSize: 5
      }}
    />
  )
}

export default NoticeList