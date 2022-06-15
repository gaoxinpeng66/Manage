import React, { useEffect, useState } from 'react'
import { Table, Button, Row, Col } from 'antd';
import {
  reqRegisterList,
} from '../../../api'
import './examinationwork.css'
import TestTable from './components/TestTable'
const TestWork = () => {

  const [dataSource, setDataSource] = useState([])
  const [patientInfo, setPatientInfo] = useState([])
  const [departmentList, setDepartmentList] = useState([])
  const [userList, setUserList] = useState([])

    const getRegisterList = () => {
      reqRegisterList().then(res => {
        const newDegister = res.data.register.filter((item) => item.state === 1)
        const newDepartment = res.data.department
        const newUser = res.data.user
        setDataSource(newDegister)
        setDepartmentList(newDepartment)
        setUserList(newUser)
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
            render: text => <span>{text}</span>,
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
                    <TestTable userList={userList} departmentList={departmentList} patientInfo={patientInfo}></TestTable>
                </Col>
            </Row>
        </div>
    )
}

export default TestWork