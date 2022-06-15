import React, { useEffect, useState, useRef } from 'react'
import {
  Button,
  Modal,
  Table,
  Switch,
} from "antd";
import {
  PlusCircleOutlined,
  ExclamationCircleOutlined
} from "@ant-design/icons";
import {
  reqUserList,
  reqUserAdd,
  reqUserDelete,
  reqUserUpdata
} from '../../../api'
import UserForm from '../../../components/Form/UserForm'
import dayjs from "dayjs";
const { confirm } = Modal

const UserList = () => {
  const [dataSource, setDataSource] = useState([])
  const [roleList, setRoleList] = useState([])
  const [departmentList, setDepartmentList] = useState([])
  const [isAddVisible, setIsAddVisible] = useState(false)
  const [isUpdataVisible, setIsUpdataVisible] = useState(false)
  const [current, setCurrent] = useState()

  const addForm = useRef(null)
  const updataForm = useRef(null)

  const getUserList = () => {
    reqUserList().then(res => {
      const newUser = res.data.users.filter((item) => item.state === 1)
      const newRole = res.data.roles.filter((item) => item.state === 1)
      const newDepartment = res.data.department.filter((item) => item.state === 1 && item.switchs === 1)
      setDataSource(newUser)
      setRoleList(newRole)
      setDepartmentList(newDepartment)
    }).catch(err => {
      console.log(err);
    })
  }
  useEffect(() => {
    getUserList()
  }, [])

  const confimMethod = async(item) => {
    confirm({
      title: '你确定删除吗？',
      icon: <ExclamationCircleOutlined />,
      okText: '确认',
      cancelText: '取消',
      onOk() {
        deleteUser(item)
      },
      onCancel() {
        console.log('onCancel');
      }
    })
  }
  const handleChange = (item) => {
    console.log(item);
    item.switchs = !item.switchs
    reqUserUpdata({ ...item })
    getUserList()
  }

  const onUpdataUser =  (item) => {
    setIsUpdataVisible(true)
    setTimeout(() => {
       updataForm.current.setFieldsValue(item)
    },100)
    setCurrent(item)
  }

  const addUser = () => {
    addForm.current.validateFields().then(value => {
      setIsAddVisible(false)
      addForm.current.resetFields()
      const user = { ...value }
      console.log(user);
      reqUserAdd(user).then(res => {
        setDataSource([...dataSource, res.data])
      })
    }).catch(err => {
      console.log(err);
    })
  }
  const deleteUser = async(item) => {
    console.log(item);
    await reqUserDelete(item._id, item.state = 0)
    getUserList()
  }
  const updataUser = () => {
    updataForm.current.validateFields().then(value => {
      setIsUpdataVisible(false)
      const user = { ...current, ...value }
      console.log(user);
      reqUserUpdata(user).then(res => {
        getUserList()
      })
    }).catch(err => {
      console.log(err);
    })
  }

  const columns = [
    {
      title: '科室',
      dataIndex: 'departmentId',
      filters: [...departmentList.map(item => (
        {
          text: item.name,
          value: item._id
        }
      )),
      ],
      onFilter: (value, item) => item.departmentId === value,
      render: (departmentId) => {
        let result = departmentList.find((item) => {
          return item._id === departmentId
        })
        if (result) return <b>{result.name} </b>
        return <b>暂无分配</b>
      }
    },
    {
      title: '职务名称',
      dataIndex: 'roleId',
      render: (roleId) => {
        let result = roleList.find((item) => {
          return item._id === roleId
        })
        if (result) return result.name
      }
    },
    {
      title: '医生姓名',
      dataIndex: 'name',
    },
    {
      title: '入职时间',
      dataIndex: 'createdAt',
      render: (createdAt) => {
        return <div>{dayjs(createdAt).format('YYYY-MM-DD')}</div>
      }
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      render: (updatedAt) => {
        return <div>{dayjs(updatedAt).format('YYYY-MM-DD')}</div>
      }
    },
    {
      title: '用户状态',
      dataIndex: 'switchs',
      render: (switchs, item) => {
        return <Switch checked={switchs} disabled={item.name === 'admin'} onChange={() => handleChange(item)} />
      }
    },
    {
      title: '操作',
      align: 'center',
      render: (item) => {
        return <div>
          <Button type="link"
            danger
            onClick={() => confimMethod(item)}
            disabled={item.name === 'admin'} >
            删除
          </Button>
          <Button type="link"
            disabled={item.name === 'admin'}
            onClick={() => onUpdataUser(item)}>
            修改
          </Button>
        </div >
      },
    },
  ];
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
        添加医生
      </Button>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(item) => item._id}
        pagination={{
          pageSize: 5
        }}
      />

      {/* 添加医生 */}
      <Modal
        visible={isAddVisible}
        title="添加医生"
        okText="确定"
        cancelText="取消"
        onCancel={() => {
          setIsAddVisible(false)
        }}
        onOk={() => addUser()}
      >
        <UserForm departmentList={departmentList} roleList={roleList} ref={addForm} ></UserForm>
      </Modal>


      {/* 更新医生 */}
      <Modal
        visible={isUpdataVisible}
        title="更新医生"
        okText="更新"
        cancelText="取消"
        onCancel={() => {
          setIsUpdataVisible(false)
        }}
        onOk={() => updataUser()}
      >
        <UserForm departmentList={departmentList} roleList={roleList} ref={updataForm} ></UserForm>
      </Modal>

    </>
  )
}

export default UserList