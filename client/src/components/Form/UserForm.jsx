import React, { forwardRef } from 'react'
import {
    Select,
    Form,
    Input,
} from "antd";
const { Option } = Select;
const UserForm = forwardRef((props, ref) => {
    const { departmentList, roleList } = props
    return (
        <Form
            ref={ref}
            layout="vertical"
        >
            <Form.Item
                name="name"
                label="医生姓名"
                rules={[{ required: true, message: '请输入医生姓名!' }]}
            >
                <Input placeholder="请输入医生姓名"  />
            </Form.Item>
            <Form.Item
                name="username"
                label="用户账号"
                rules={[{ required: true, message: '请输入用户账号!' }]}
            >
                <Input placeholder="请输入账号" />
            </Form.Item>
            <Form.Item
                name="password"
                label="密码"
                rules={[{ required: true, message: '请输入用户密码!' }]}
            >
                <Input placeholder="请输入密码" />
            </Form.Item>
            <Form.Item
                name="departmentId"
                label="所属科室"
                rules={[{ required: true, message: '请选择所属科室!' }]}
            >
                <Select >
                    {
                        departmentList.map((item) => {
                            return <Option value={item._id} key={item._id}>{item.name}</Option>
                        })
                    }
                </Select>
            </Form.Item>
            <Form.Item
                name="roleId"
                label="职务"
                rules={[{ required: true, message: '请选择医生职务!' }]}
            >
                <Select>
                    {
                        roleList.map((item) => {
                            if (item.name !== '超级管理员') {
                                return <Option value={item._id} key={item._id}>{item.name}</Option>
                            } else {
                                return null

                            }
                        })
                    }
                </Select>
            </Form.Item>
        </Form>
    )
})

export default UserForm