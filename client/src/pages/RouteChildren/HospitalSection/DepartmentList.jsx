import React, { useEffect, useState, useRef } from 'react'
import {
  Button,
  Modal,
  Table,
  Tag,
  Switch
} from "antd";
import {
  PlusCircleOutlined,
  ExclamationCircleOutlined
} from "@ant-design/icons";
import {
  reqdepartmentList,
  reqdepartmentAdd,
  reqdepartmentDelete,
  reqdepartmentUpdata
} from '../../../api'
import MyForm from '../../../components/Form/MyForm'
import dayjs from "dayjs";
const { confirm } = Modal

const DepartmentList = () => {

  const [dataSource, setDataSource] = useState([])
  const [isAddVisible, setIsAddVisible] = useState(false);
  const addForm = useRef(null)

  useEffect(() => {
    getDepartment()
  }, [])

  const columns = [
    {
      title: '科室名称',
      dataIndex: 'name',
      render: (name) => {
        return <Tag color="#f50"><b>{name}</b></Tag>
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      render: (createdAt) => {
        return <Tag color="green">{dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss')}</Tag>
      }
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      render: (updatedAt) => {
        return <Tag color="geekblue">{dayjs(updatedAt).format('YYYY-MM-DD HH:mm:ss')}</Tag>
      }
    },
    {
      title: '状态',
      render: (item) => {
        if (item.switchs === 1) {
          return <Switch defaultChecked onChange={() => onChange(item)} />
        } else {
          return <Switch onChange={() => onChange(item)} />
        }
      }
    },
    {
      title: '操作',
      align: 'center',
      render: (item) => {
        return <Button type="link" danger onClick={() => confimMethod(item)}>删除</Button>
      },
    },
  ];

  const onChange = (item) => {
    if (item.switchs === 1) {
       reqdepartmentUpdata(item._id, item.switchs = 0)
      getDepartment()

    } else {
       reqdepartmentUpdata(item._id, item.switchs = 1)
      getDepartment()
    }

  }

  const confimMethod =  async (item) => {
    confirm({
      title: '你确定删除吗？',
      icon: <ExclamationCircleOutlined />,
      okText: '确认',
      cancelText: '取消',
      onOk() {
        deleteDepartment(item)
      },
      onCancel() {
        console.log('onCancel');
      }
    })
  }

  const getDepartment =  () => {
     reqdepartmentList().then(res => {
      const newData = res.data.filter((item) => item.state === 1)
      setDataSource(newData)
    }).catch(err => {
      console.log(err);
    })
  }

  const deleteDepartment =  async(item) => {
    await reqdepartmentDelete(item._id, item.state = 0)
    getDepartment()
  }

  const addDepartment = () => {
    addForm.current.validateFields().then(value => {
      setIsAddVisible(false)
      addForm.current.resetFields()
      reqdepartmentAdd(value.name).then(res => {
        setDataSource([...dataSource, res.data])
      })
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <>
      <Button
        type="primary"
        icon={<PlusCircleOutlined />}
        onClick={() => {
          setIsAddVisible(true);
        }}
        style={{ marginBottom: '15px' }}
      >
        添加部门
      </Button>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(item) => item._id}
        pagination={{
          pageSize: 5
        }}
      />
      {/* 添加部门 */}
      <Modal
        visible={isAddVisible}
        title="添加部门"
        okText="确定"
        cancelText="取消"
        onCancel={() => {
          setIsAddVisible(false)
        }}
        onOk={() => addDepartment()}
      >
        <MyForm ref={addForm} message="请输入添加部门名称" />
      </Modal>
    </>
  )
}

export default DepartmentList