import React, { useEffect, useState } from 'react'
import { PageHeader, Descriptions } from 'antd';
import {
  reqNoticetDetail,
} from '../../../../api'
import dayjs from "dayjs";
import './detail.css'

const NoticeDetail = (props) => {

  const [noticeDetail, setNoticeDetail] = useState(null)
  useEffect(() => {
    reqNoticetDetail(props.match.params.id).then(res => {
      setNoticeDetail(res.data)
    })
  }, [props.match.params.id])


  return (<div>
    {
      noticeDetail && <div>
        <PageHeader
          ghost={false}
          onBack={() => window.history.back()}
          title="通知公告"
        >
          <Descriptions column={1}>
            <Descriptions.Item>
              <div className='current'>{noticeDetail.title}</div>
            </Descriptions.Item>

          </Descriptions>

          <Descriptions size="small" column={3}>
            <Descriptions.Item label="发布人">{noticeDetail.user}</Descriptions.Item>
            <Descriptions.Item label="发布时间">
              {dayjs(noticeDetail.createdAt).format('YYYY-MM-DD HH:mm:ss')}
            </Descriptions.Item>
            <Descriptions.Item label="公告状态">
              {
                noticeDetail.condition === 0 ? <span style={{ color: 'red' }}>未发布</span> :
                  <span style={{ color: 'rgb(24, 144, 255)' }}>已发布</span>
              }
            </Descriptions.Item>
          </Descriptions>
        </PageHeader>

        <div dangerouslySetInnerHTML={{
          __html:noticeDetail.content
        }} style={{
          padding:"10px 15px",
          borderTop:'1px solid black',
          height:'300px',
          overflow:'auto'
          }} >
        </div>

      </div>
    }
  </div>

  )
}

export default NoticeDetail