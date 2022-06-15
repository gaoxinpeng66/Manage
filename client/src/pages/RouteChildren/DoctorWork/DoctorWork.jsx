import React, { useEffect, useState } from 'react'
import { Table, Button, Row, Col } from 'antd';
import {
    reqRegisterList,
} from '../../../api'
import './doctorwork.css'
import DoctorTable from './components/DoctorTable'
const DoctorWork = () => {

    const [dataSource, setDataSource] = useState([])
    const [patientInfo, setPatientInfo] = useState([])
    const [departmentList, setDepartmentList] = useState([])
    const [userList, setUserList] = useState([])

    const hadnleCheckbox = (value) => {
        let ret = userList.find(item => {
            return item._id === value.userId ? true : false
        })
        return true
    }
    const getRegisterList = () => {
        reqRegisterList().then(res => {
            const newDepartment = res.data.department
            const newUser = res.data.user
            setDepartmentList(newDepartment)
            setUserList(newUser)
            const newDegister = res.data.register.filter((item) => hadnleCheckbox(item) && (item.state === 0 || item.state === 2))
            setDataSource(newDegister)
        }).catch(err => {
            console.log(err);
        })
    }
    useEffect(() => {
        getRegisterList()
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
                    <DoctorTable userList={userList} departmentList={departmentList} patientInfo={patientInfo}></DoctorTable>
                </Col>
            </Row>
        </div>
    )
}

export default DoctorWork