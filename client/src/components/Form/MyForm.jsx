import React, { forwardRef } from 'react'
import { Form, Input } from "antd";
const MyForm = forwardRef((props, ref) => {
    const { message } = props
    return (
        <Form
            ref={ref}
            layout="vertical"
        >
            <Form.Item
                name="name"
                rules={[
                    {
                        required: true,
                        message: message + '!',
                    },
                ]}
            >
                <Input placeholder={message} />
            </Form.Item>
        </Form>
    )
})
export default MyForm