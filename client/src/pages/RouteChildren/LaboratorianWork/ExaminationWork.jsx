import React, { useEffect, useState } from 'react'
import { Table, Button, Row, Col } from 'antd';
import {
    reqPatientList,
} from '../../../api'
import './examinationwork.css'
import ExaminationTable from './components/ExaminationTable'
const ExaminationWork = () => {

    const [dataSource, setDataSource] = useState([])
    const [patientInfo, setPatientInfo] = useState([])
    const [project, setProject] = useState([])


    const getExpatientList = () => {
        reqPatientList().then(res => {
            const newPatientt = res.data.patient.filter((item) => item.state === 0)
            const newProject = res.data.project
            setDataSource(newPatientt)
            setProject(newProject)
        }).catch(err => {
            console.log(err);
        })
    }
    useEffect(() => {
        getExpatientList()
    }, [])

    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            render: text => <div>{text}</div>,
        },
        {
            title: '操作',
            render: (item) => {
                return <div>
                    <Button type="link" onClick={() => handSelect(item)}>选择</Button>
                </div >
            },
        },
    ];
    const handSelect = (item) => {
        setPatientInfo(item)
    }
    return (
        <div>

            <Row>
                <Col span={4}>
                    <div className='examinationrork-box'>
                        <Table
                            dataSource={dataSource}
                            columns={columns}
                            rowKey={(item) => item._id}
                        />
                    </div>
                </Col>
                <Col span={20}>
                    <ExaminationTable project={project} patientInfo={patientInfo}></ExaminationTable>
                </Col>
            </Row>
        </div>
    )
}

export default ExaminationWork