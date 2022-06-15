import React, { useState, useEffect } from 'react'
import { Card, Col, Row, Form, Input, Button, Select, DatePicker, message } from 'antd';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import {
  reqProjectList,
  reqPatientAdd
} from '../../../api'
const { Option } = Select;

const Examine = (props) => {

  const [projectList, setProjectList] = useState([])
  useEffect(() => {
    getProjectList()
  }, [])

  const getProjectList = () => {
    reqProjectList().then(res => {
      setProjectList(res.data)
    }).catch(err => {
      console.log(err);
    })
  }
  const onFinish = (values) => {
    const value = {
      ...values,
      'date': values['date-picker'].format('YYYY-MM-DD')
    };
    const { age, name, sex, address, phone, date, projectId,emergency} = value
    const ret = { age, name, sex, address, phone, date, projectId,emergency }
    reqPatientAdd(ret).then(res=>{
        if (res.status === 0) {
          props.history.push('/patient/examine')
          message.success('预约体检成功')
        } else {
          message.error('预约失败，请检查表单')

        }
    })
  };

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
        <Card title="体检登记" bordered={false}>
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
        <Card title="体检信息" bordered={false}>
          <Row gutter={4}>
            <Col span={8}><Form.Item
              label="体检项目名"
              name="projectId"
              rules={[
                {
                  required: true,
                  message: '请选择体检项目！',
                },
              ]}
            >
              <Select >
                {
                  projectList.map((item) => {
                    if (item.state=== 1) {
                      return <Option value={item._id} key={item._id}>{item.name}</Option>
                    }else {
                      return null
                    }
                  })
                }
              </Select>
            </Form.Item></Col>
            <Col span={8}>
              <Form.Item
                label="紧急联系人"
                name="emergency"
                rules={[{ required: true, message: '请输入紧急联系人手机号!' }]}
              >
                <Input />
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

export default Examine