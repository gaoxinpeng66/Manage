import React, { forwardRef } from 'react'
import {
    Form,
    Input,
} from "antd";
const ExpatientForm = forwardRef((props, ref) => {
    return (
        <Form
            ref={ref}
            layout="vertical"
        >
            <Form.Item
                name="name"
                label="体检项目名字"
                rules={[{ required: true, message: '请输入体检项目名字!' }]}
            >
                <Input placeholder="请输入体检项目名"  />
            </Form.Item>
            <Form.Item
                name="content"
                label="体检套餐内容"
                rules={[{ required: true, message: '请输入体检套餐内容!' }]}
            >
                <Input placeholder="请输入体检套餐内容" />
            </Form.Item>
        </Form>
    )
})

export default ExpatientForm