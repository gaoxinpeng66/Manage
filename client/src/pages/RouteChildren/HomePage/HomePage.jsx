import React, { useEffect, useState } from 'react'
import { Calendar, Card, Col, Row, ConfigProvider, List, Typography } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import './homepage.css'
import {
  reqNoticeList,
  reqUserList,
  reqdepartmentList,
  reqRegisterList,
  reqPatientList
} from '../../../api'

import user from "../../../assets/user.png"
import department from "../../../assets/department.png"
import examination from "../../../assets/examination.png"
import register from "../../../assets/register.png"


const HomePage = () => {

  function onPanelChange(value, mode) {
    console.log(value.format('YYYY-MM-DD'), mode);
  }

  const [noticeList, setNoticeList] = useState()
  const [userList, setUserList] = useState()
  const [departmentList, setDepartmentList] = useState()
  const [registerList, setRegisterList] = useState()
  const [patientList, setPatientList] = useState()

  useEffect(() => {
    getNoticeList()
    getUserList()
    getDepartmentList()
    getRegisterList()
    getExaminations()
  }, [])

  const getNoticeList = () => {
    reqNoticeList().then(res => {
      const newList = res.data.filter((item) => item.state === 1 && item.condition === 1)
      setNoticeList(newList)
    })
  }
  const getUserList = () => {
    reqUserList().then(res => {
      const newList = res.data.users.filter((item) => item.state === 1 && item.switchs === true)
      setUserList(newList.length)
    })
  }
  const getRegisterList = () => {
    reqRegisterList().then(res => {
      const newList = res.data.register
      setRegisterList(newList.length)

    })
  }
  const getExaminations = () => {
    reqPatientList().then(res => {
      const newList = res.data.patient
      setPatientList(newList.length)

    })
  }

  const getDepartmentList = () => {
    reqdepartmentList().then(res => {
      const newList = res.data.filter((item) => item.state === 1 && item.switchs === 1)
      setDepartmentList(newList.length)

    })
  }

  return (
    <ConfigProvider locale={zh_CN}>
      <div className="site-card-wrapper">
        <Row gutter={16}>
          <Col span={6}>
            <Card >
              <div className='number-box' >
                <img src={user} className='number-img' />
                <span className='number-span'>在职医生 {userList} 人</span>
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <div className='number-box'>
                <img src={department} className='number-img' />
                <span className='number-span'>医院科室 {departmentList} 门</span>
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <div className='number-box'>
                <img src={register} className='number-img' />
                <span className='number-span'>挂号总数 {registerList} 人</span>
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <div className='number-box'>
                <img src={examination} className='number-img' />
                <span className='number-span'>预约体检 {patientList} 人</span>
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      <Row gutter={16} className="bottom">
        <Col span={10}>
          <Card title="院内通知" style={{ height: '300px', }} >
            <List

              dataSource={noticeList}
              renderItem={item => (
                <List.Item>
                  <div>
                    <span className='current-new'>[最新]</span>
                    <a href={`/notice/detail/${item._id}`} > <b>{item.title}</b></a >
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
          <Col span={14}>
        <div className="site-calendar-demo-card">
            <Card style={{height:'100px'}} >
              <div >
                <Calendar fullscreen={false} onPanelChange={onPanelChange} />
              </div>
            </Card>
        </div>
          </Col>
      </Row>

    </ConfigProvider>

  )
}

export default HomePage