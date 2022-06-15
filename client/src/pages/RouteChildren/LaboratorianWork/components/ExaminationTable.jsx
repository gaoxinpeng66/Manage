import React from 'react'
import { Descriptions, Form, Input, Button, message } from 'antd';
import { withRouter } from 'react-router-dom'
import './ExaminationTable.css'
import { reqPatientUpdata } from '../../../../api'
const ExaminationTable = (props) => {

    const onFinish = async (values) => {
        // console.log(values);
        // console.log(props.patientInfo);
        const result = { ...props.patientInfo, ...values }
        console.log(result);
        await reqPatientUpdata(result._id, result.emeresultrgency, result.state = 1).then(res => {
            if (res.status === 0) {
                message.success('体检结果已成功提交')
                props.history.push('/patient/examine')
            } else {
                message.error('体检结果提交失败')
            }
        })
    };
    return (
        <div className='ExaminationTable-box'>
            <div className='ExaminationTable-title'>
                当前体检患者：<span style={{ color: '#fff' }}>{props.patientInfo.name}</span>
            </div>
            <Descriptions bordered>
                <Descriptions.Item label="姓名">{props.patientInfo.name}</Descriptions.Item>
                <Descriptions.Item label="年龄">{props.patientInfo.age}</Descriptions.Item>
                <Descriptions.Item label="检查项目"></Descriptions.Item>
                <Descriptions.Item label="性别">{props.patientInfo.sex === 1 ? '女' : '男'}</Descriptions.Item>
                <Descriptions.Item label="手机号">{props.patientInfo.phone}</Descriptions.Item>
            </Descriptions>
            <div className='ExaminationTable-form'>
                <Form
                    name="nest-messages"
                    onFinish={onFinish}>
                    <Form.Item
                        name="emeresultrgency"
                        label="体检结果"
                        rules={[
                            {
                                required: true,
                                message: '体检结果不能为空!',
                            },
                        ]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}>
                        <Button type="primary" htmlType="submit">
                            确定
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default withRouter(ExaminationTable)