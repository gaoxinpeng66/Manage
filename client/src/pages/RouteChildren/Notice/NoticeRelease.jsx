import React, { useState } from 'react';
import Editors from './components/Editor'
import { Form, Input, Button, Card, message,notification } from 'antd';
import { reqNoticAdd } from '../../../api'

const NoticeRelease = (props) => {
  const [content,setContent]=useState()

  const onFinish = (values) => {
    if (content.trim() === '' || content.trim()=== '<p></p>'|| content.trim()=== '<p></p>\n') {
      message.error('内容不能为空')
      return null
    }
    const value = {...values,content}
    reqNoticAdd(value).then((res)=>{
      if (res.status === 0) {
        notification.info({
          message: `通知`,
          description:
            '编辑公告成功，请到公告列表进行审核',
          placement:'bottomRight',
        });
        props.history.push('/notice/list')
      }else {
        message.error('请检查输入内容是否出错')
      }
    })
  };

  return (
    <Card title="发布通知公告" bordered={false} >
      <Form
        name="basic"
        onFinish={onFinish}
        labelCol={{ md: 2 }}
        wrapperCol={{ md: 15 }}
        style={{marginTop:0}}
      >
        <Form.Item
          label="公告标题"
          name="title"
          rules={[{ required: true, message: '请输入公告标题!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="公告内容">
         <Editors getContent={(value)=>{
           setContent(value)
         }} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" >
            确定
          </Button>
        </Form.Item>
      </Form>
     </Card>

  )
}

export default NoticeRelease