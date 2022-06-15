import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  Modal,
  Table,
} from "antd";
import {
  PlusCircleOutlined,
  ExclamationCircleOutlined
} from "@ant-design/icons";
import {
  reqProjectList,
  reqProjectAdd,
  reqProjectDelete,
  reqProjectUpdata
} from '../../../api'
import ProjectForm from '../../../components/Form/ProjectForm'
import dayjs from "dayjs";
const { confirm } = Modal

const ProjectList = () => {

  const [dataSource, setDataSource] = useState()
  const [isAddVisible, setIsAddVisible] = useState(false)
  const [isUpdataVisible, setIsUpdataVisible] = useState(false)
  const [current, setCurrent] = useState()


  const addForm = useRef(null)
  const updataForm = useRef(null)

  const getProjectList = () => {
    reqProjectList().then(res => {
      const newUser = res.data.filter((item) => item.state === 1)
      setDataSource(newUser)
    }).catch(err => {
      console.log(err);
    })
  }
  useEffect(() => {
    getProjectList()
  }, [])

  const confimMethod = async (item) => {
    confirm({
      title: '你确定删除吗？',
      icon: <ExclamationCircleOutlined />,
      okText: '确认',
      cancelText: '取消',
      onOk() {
        deleteProject(item)
      },
      onCancel() {
        console.log('onCancel');
      }
    })
  }

  const onUpdataProject = async(item) => {
    setIsUpdataVisible(true)
    setTimeout(() => {
       updataForm.current.setFieldsValue(item)
    },100)
    setCurrent(item)
  }

  const addProject = () => {
    addForm.current.validateFields().then(value => {
      setIsAddVisible(false)
      addForm.current.resetFields()
      const project = { ...value }
      console.log(project);
      reqProjectAdd(project).then(res => {
        setDataSource([...dataSource, res.data])
      })
    }).catch(err => {
      console.log(err);
    })
  }
  const deleteProject = async (item) => {
    console.log(item);
    await reqProjectDelete(item._id, item.state = 0)
    getProjectList()
  }
  const updataProject = () => {
    updataForm.current.validateFields().then(value => {
      setIsUpdataVisible(false)
      const project = { ...current, ...value }
      reqProjectUpdata(project).then(res => {
        getProjectList()
      })
    }).catch(err => {
      console.log(err);
    })
  }

  const columns = [
    {
      title: '体检项目名字',
      dataIndex: 'name',
      render: (name) => {
        return <b>{name}</b>
      }
    },
    {
      title: '体检项目内容',
      dataIndex: 'content',
    },
    {
      title: '创建人',
      dataIndex: 'user',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      render: (createdAt) => {
        return <div>{dayjs(createdAt).format('YYYY-MM-DD')}</div>
      }
    },
    {
      title: '操作',
      align: 'center',
      render: (item) => {
        return <div>
          <Button type="link"
            danger
            onClick={() => confimMethod(item)}>
            删除
          </Button>
          <Button type="link"
            onClick={() => onUpdataProject(item)}>
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
        添加体检项目
      </Button>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(item) => item._id}
        pagination={{
          pageSize: 5
        }}
      />

      {/* 添加体检项目 */}
      <Modal
        visible={isAddVisible}
        title="添加体检项目"
        okText="确定"
        cancelText="取消"
        onCancel={() => {
          setIsAddVisible(false)
        }}
        onOk={() => addProject()}
      >
        <ProjectForm ref={addForm} ></ProjectForm>
      </Modal>


      {/* 更新体检项目 */}
      <Modal
        visible={isUpdataVisible}
        title="更新体检项目"
        okText="更新"
        cancelText="取消"
        onCancel={() => {
          setIsUpdataVisible(false)
        }}
        onOk={() => updataProject()}
      >
        <ProjectForm ref={updataForm}  ></ProjectForm>
      </Modal>

    </>
  )
}

export default ProjectList