import React, { useEffect, useState, useRef } from 'react'
import {
  Button,
  Modal,
  Table,
  Tag,
  Tree
} from "antd";
import {
  PlusCircleOutlined,
  ExclamationCircleOutlined
} from "@ant-design/icons";
import {
  reqMenuList,
  reqRoleList,
  reqRoleAdd,
  reqRoleDelete,
  reqRoleUpdata
} from '../../../api'
import { ListToTree } from '../../../utils/method'
import MyForm from '../../../components/Form/MyForm'
import dayjs from "dayjs";
const { confirm } = Modal

const RoleList = () => {

  const [dataSource, setDataSource] = useState([])
  const [menuList, setmenuList] = useState([])
  const [currentMenuList, setCurrentMenuList] = useState([])
  const [currenRoleId, setCurrenRoleId] = useState()


  const [isAddVisible, setIsAddVisible] = useState(false);
  const [isUpdataVisible, setIsUpdataVisible] = useState(false);
  const addForm = useRef(null)

  useEffect(() => {
    getRoleList()
    getMenuList()
  }, [])

  const columns = [
    {
      title: '角色名称',
      dataIndex: 'name',
      render: (name) => {
        return <Tag color="red"><b>{name}</b></Tag>
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
      title: '操作',
      align: 'center',
      render: (item) => {
        return <div>
          <Button type="link" danger onClick={() => confimMethod(item)}>删除</Button>
          <Button type="link"
            onClick={() => handleMenuModul(item)}>
            设置权限
          </Button>
        </div >
      },
    },
  ];


  const handleMenuModul = (item) => {
    setIsUpdataVisible(true)
    setCurrentMenuList(item.menus)
    setCurrenRoleId(item._id)
  }
  const confimMethod = async (item) => {
    confirm({
      title: '你确定删除吗？',
      icon: <ExclamationCircleOutlined />,
      okText: '确认',
      cancelText: '取消',
      onOk() {
        deleteRole(item)
      },
      onCancel() {
        console.log('onCancel');
      }
    })
  }

  const getRoleList = () => {
    reqRoleList().then(res => {
      const newData = res.data.filter((item) => item.state === 1)
      setDataSource(newData)
    }).catch(err => {
      console.log(err);
    })
  }
  const getMenuList = async() => {
    await reqMenuList().then(res => {
      const newRes = ListToTree(res.data)
      setmenuList(newRes)
    })
  }

  const deleteRole = async(item) => {
   await reqRoleDelete(item._id, item.state = 0)
    getRoleList()
  }

  const addRole = () => {
    addForm.current.validateFields().then(value => {
      setIsAddVisible(false)
      addForm.current.resetFields()
      reqRoleAdd(value.name).then(res => {
        setDataSource([...dataSource, res.data])
      })
    }).catch(err => {
      console.log(err);
    })
  }

  const updataRole = async () => {
    setIsUpdataVisible(false)
    await reqRoleUpdata(currenRoleId, currentMenuList)
    getRoleList()
  }
  const onCheck = (checkedKeys) => {
    setCurrentMenuList(checkedKeys)
  };

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
        添加角色
      </Button>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(item) => item._id}
        pagination={{
          pageSize: 5
        }}
      />
      {/* 添加角色 */}
      <Modal
        visible={isAddVisible}
        title="添加角色"
        okText="确定"
        cancelText="取消"
        onCancel={() => {
          setIsAddVisible(false)
        }}
        onOk={() => addRole()}
      >
        <MyForm ref={addForm} message="请输入添加角色名称" />
      </Modal>

      {/* 分配权限 */}
      <Modal
        visible={isUpdataVisible}
        title="设置权限"
        okText="确定"
        cancelText="取消"
        onCancel={() => {
          setIsUpdataVisible(false)
        }}
        onOk={() => updataRole()}
      >
        <Tree
          checkable
          checkedKeys={currentMenuList}
          onCheck={onCheck}
          treeData={menuList}
        />
      </Modal>
    </>
  )
}

export default RoleList