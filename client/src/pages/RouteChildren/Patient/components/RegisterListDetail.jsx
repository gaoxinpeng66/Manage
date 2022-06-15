import React, { useEffect, useState } from 'react'
import { PageHeader, Descriptions } from 'antd';
import {
    reqRegisterDetail,
    // reqdepartmentList,
} from '../../../../api'
import './detail.css'

const RegisterListDetail = (props) => {

    const [registerDetail, setRegisterDetail] = useState(null)
    // const [projectLis, setProjectLis] = useState(null)

    useEffect(() => {
        reqRegisterDetail(props.match.params.id).then(res => {
            setRegisterDetail(res.data)
        })
    }, [props.match.params.id])

    // useEffect(() => {
    //     reqdepartmentList().then(res => {
    //         setProjectLis(res.data)
    //     })
    // }, [props.match.params.id])

    
    return (<div>
        {
            registerDetail && <div>
                <PageHeader
                    ghost={false}
                    onBack={() => window.history.back()}
                    title="门诊患者信息"
                >
                    <Descriptions bordered style={{ marginTop: '30px' }}>
                        <Descriptions.Item label="姓名">{registerDetail.name}</Descriptions.Item>
                        <Descriptions.Item label="年龄">{registerDetail.age} 岁</Descriptions.Item>
                        <Descriptions.Item label="体检状态">
                            {
                                registerDetail.state === 0 || 3 ? <span style={{ color: 'red' }}>诊断</span> :
                                    <span style={{ color: 'rgb(24, 144, 255)' }}>检验</span>
                            }
                        </Descriptions.Item>
                        <Descriptions.Item label="检查时间">{registerDetail.date}</Descriptions.Item>
                        <Descriptions.Item label="手机号" >
                            {registerDetail.phone}
                        </Descriptions.Item>
                        <Descriptions.Item label="检查医生" >
                            {registerDetail.userId}
                        </Descriptions.Item>

                        <Descriptions.Item label="家庭地址"> {registerDetail.address}</Descriptions.Item>
                        <Descriptions.Item label="性别">
                            {registerDetail.sex === '0' ? <span>男</span> : <span>女</span>}
                        </Descriptions.Item>
                        <Descriptions.Item label="挂号科室">
                            {registerDetail.departmentId}
                        </Descriptions.Item>
                        <Descriptions.Item label="诊断结果">
                            {registerDetail.diagnosticresults}
                        </Descriptions.Item>
                        <Descriptions.Item label="检验结果">
                            {registerDetail.emeresultrgency}
                        </Descriptions.Item>
                    </Descriptions>
                </PageHeader>

            </div>
        }
    </div>

    )
}

export default RegisterListDetail