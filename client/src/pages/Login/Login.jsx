import React from 'react'
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { reqLogin } from '../../api'
import './login.css'

const Login = (props) => {

  const onFinish =  (values) => {
    const { username, password } = values
     reqLogin(username, password).then(res => {
      if (res.status === 0) {
        message.success('登录成功')
        localStorage.setItem("user", JSON.stringify(res.data.result1))
        localStorage.setItem("token", JSON.stringify(res.data.token))
        props.history.push('/homepage')
      } else {
        message.error(res.data)
      }
    })
  };


  return (
    <div className='box'>
      <div className='login-box'>
        <Card title="登录" style={{ height: "100%", width: "100%", borderRadius: "20px" }}>
          <Form
            name="basic"
            onFinish={onFinish}
          >
            <Form.Item
              name="username" 
              rules={[
                {required: true,message: '请输入账号!',},
                {pattern: /^[a-zA-Z0-9_-]{3,20}$/,message: '账号格式错误,长度3-20位且不支持特殊字符'
                },
              ]}
            >
              <Input className='login-input ' prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入登录账号" />
            </Form.Item>
            <Form.Item
            name="password"
              rules={[
                {
                  required: true,
                  message: '请输入密码!',
                },
                {pattern: /^[a-zA-Z0-9_-]{5,20}$/,message: '账号格式错误,长度5-20位且不支持特殊字符'}
              ]}>
              <Input.Password className='login-input' prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请输入登录密码" />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                登录
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  )
}

export default Login