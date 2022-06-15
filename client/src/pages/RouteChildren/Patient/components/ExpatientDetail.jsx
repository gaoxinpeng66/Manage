import React, { useEffect, useState } from 'react'
import { PageHeader, Descriptions } from 'antd';
import {
    reqPatientDetail,
    // reqProjectList
} from '../../../../api'
import './detail.css'

const ExpatientDetail = (props) => {

    const [expatientDetail, setExpatientDetail] = useState(null)
    // const [projectLis, setProjectLis] = useState(null)

    useEffect(() => {
        reqPatientDetail(props.match.params.id).then(res => {
            setExpatientDetail(res.data)
        })
    }, [props.match.params.id])

    // useEffect(() => {
    //     reqProjectList().then(res => {
    //         setProjectLis(res.data)
    //     })
    // }, [props.match.params.id])

    
    return (<div>
        {
            expatientDetail && <div>
                <PageHeader
                    ghost={false}
                    onBack={() => window.history.back()}
                    title="体检患者信息"
                >
                    <Descriptions bordered style={{ marginTop: '30px' }}>
                        <Descriptions.Item label="姓名">{expatientDetail.name}</Descriptions.Item>
                        <Descriptions.Item label="年龄">{expatientDetail.age} 岁</Descriptions.Item>
                        <Descriptions.Item label="体检状态">
                            {
                                expatientDetail.state === 0 ? <span style={{ color: 'red' }}>未检查</span> :
                                    <span style={{ color: 'rgb(24, 144, 255)' }}>已检查</span>
                            }
                        </Descriptions.Item>
                        <Descriptions.Item label="预约体检时间">{expatientDetail.date}</Descriptions.Item>
                        <Descriptions.Item label="手机号" >
                            {expatientDetail.phone}
                        </Descriptions.Item>
                        <Descriptions.Item label="检查医生" >
                            {expatientDetail.user.trim() === '' ? <span>暂无医生体检</span> : <span>{expatientDetail.user}</span>}
                        </Descriptions.Item>

                        <Descriptions.Item label="家庭地址"> {expatientDetail.address}</Descriptions.Item>
                        <Descriptions.Item label="性别">
                            {expatientDetail.sex === '0' ? <span>男</span> : <span>女</span>}
                        </Descriptions.Item>
                        <Descriptions.Item label="检查项目"></Descriptions.Item>
                        <Descriptions.Item label="体检结果">
                            {expatientDetail.emeresultrgency}
                        </Descriptions.Item>
                    </Descriptions>
                </PageHeader>

            </div>
        }
    </div>

    )
}

export default ExpatientDetail