import React, { useState, useEffect } from 'react'
import { Card, Col, Row, Form, Input, Button, Select, DatePicker, message } from 'antd';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import {
  reqRegisterList,
  reqRegisterAdd
} from '../../../api'
const { Option } = Select;

const Register = (props) => {

  const [departmentList, settDepartmentList] = useState([])
  const [userList, setUserList] = useState([])
  const [currUserList, setCurrUserList] = useState([])


  useEffect(() => {
    getDepartmentList()
  }, [])

  const getDepartmentList = () => {
    reqRegisterList().then(res => {
      console.log(res);
      const newDtepartment = res.data.department.filter(item => item.cuurent === 1)
      settDepartmentList(newDtepartment)
      const newUser = res.data.user.filter(item => item.state === 1)
      setUserList(newUser)
    }).catch(err => {
      console.log(err);
    })
  }

  const onFinish = (values) => {
    const value = {
      ...values,
      'date': values['date-picker'].format('YYYY-MM-DD')
    };
    const { age, name, sex, address, phone, date, departmentId, userId } = value
    const ret = { age, name, sex, address, phone, date, departmentId, userId }
    reqRegisterAdd(ret).then(res => {
      if (res.status === 0) {
        props.history.push('/patient/outpatient')
        message.success('预约挂号门诊成功！')
      } else {
        message.error('预约失败，请检查表单')

      }
    })
  };

  const handChange = (value) => {
    console.log(value);
    let ret =  userList.filter(item =>{
      return item.departmentId === value
    })
    console.log(...ret);
    setCurrUserList(ret)
  }

  const config = {
    rules: [
      {
        type: 'object',
        required: true,
        message: '请选择日期!',
      },
    ],
  };

  return (
    <div className="site-card-wrapper">
      <Form
        name="basic"
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
      >
        <Card title="挂号登记" bordered={false}>
          <Row gutter={20}>
            <Col span={8}>
              <Form.Item
                label="姓名"
                name="name"
                rules={[
                  {
                    required: true,
                    message: '请输入姓名!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="年龄"
                name="age"
                rules={[
                  {
                    required: true,
                    message: '请输入年龄！',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="性别"
                name="sex"
                rules={[
                  {
                    required: true,
                    message: '请选择性别！',
                  },
                ]}
              >
                <Select>
                  <Option value="0">男</Option>
                  <Option value="1">女</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="家庭地址"
                name="address"
                rules={[
                  {
                    required: true,
                    message: '请输入家庭地址！',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="手机号码"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: '请输入手机号码！',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="预约时间"
                name="date-picker"
                {...config}
              >
                <DatePicker locale={locale} />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card title="门诊信息" bordered={false}>
          <Row gutter={4}>
            <Col span={8}><Form.Item
              label="挂号科室"
              name="departmentId"
              rules={[
                {
                  required: true,
                  message: '请选择挂号科室！',
                },
              ]}
            >
              <Select onChange={handChange}>
                {
                  departmentList.map((item) => {
                    if (item.state === 1) {
                      return <Option value={item._id} key={item._id}>{item.name}</Option>
                    } else {
                      return null
                    }
                  })
                }
              </Select>
            </Form.Item></Col>
            <Col span={8}>
              <Form.Item
                label="门诊医生"
                name="userId"
                rules={[
                  {
                    required: true,
                    message: '请选择门诊医生！',
                  },
                ]}
              >
                <Select >
                  {
                    currUserList.map((item) => {
                      if (item.state === 1) {
                        return <Option value={item._id} key={item._id}>{item.name}</Option>
                      } else {
                        return null
                      }
                    })
                  }
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form >
    </div >
  )
}

export default Register