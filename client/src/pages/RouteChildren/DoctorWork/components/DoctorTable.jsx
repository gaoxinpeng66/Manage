import React from 'react'
import { Descriptions, Form, Input, Button, message } from 'antd';
import { withRouter } from 'react-router-dom'
import './doctortable.css'
import { reqRegisterUpdata1 } from '../../../../api'
const DoctorTable = (props) => {

    const onFinish = async (values) => {

        const result = { ...props.patientInfo, ...values }
        console.log(result);
        await reqRegisterUpdata1(result._id, result.diagnosticresults, result.emeresultrgencyItem,result.state = 1).then(res => {
            if (res.status === 0) {
                message.success('诊断结果已成功提交，已转至检验科')
                props.history.push('/patient/outpatient')
            } else {
                message.error('诊断结果提交失败')
            }
        })
    };
    return (
        <div className='ExaminationTable-box'>
            <div className='ExaminationTable-title'>
                当前门诊患者：<span style={{ color: '#fff' }}>{props.patientInfo.name}</span>
            </div>
            <Descriptions bordered>
                <Descriptions.Item label="姓名" >{props.patientInfo.name}</Descriptions.Item>
                <Descriptions.Item label="年龄" >{props.patientInfo.age}</Descriptions.Item>
                <Descriptions.Item label="性别" >{props.patientInfo.sex === 1 ? '女' : '男'}</Descriptions.Item>
                <Descriptions.Item label="手机号" >{props.patientInfo.phone}</Descriptions.Item>
                <Descriptions.Item label="检验结果">{props.patientInfo.emeresultrgency}</Descriptions.Item>
            </Descriptions>
            <div className='ExaminationTable-form'>
                <Form
                    name="nest-messages"
                    onFinish={onFinish}>
                    <Form.Item
                        name="diagnosticresults"
                        label="诊断结果"
                        rules={[
                            {
                                required: true,
                                message: '诊断结果不能为空!',
                            },
                        ]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item
                        name="emeresultrgencyItem"
                        label="检查项目"
                        rules={[
                            {
                                required: true,
                                message: '诊断结果不能为空!',
                            },
                        ]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}>
                        <Button  type="primary" htmlType="submit">
                            确定
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default withRouter(DoctorTable)