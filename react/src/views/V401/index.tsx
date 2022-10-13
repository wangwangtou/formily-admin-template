import { Button } from '@/components/FormilyPage/projectComponents'
import React, { useState } from 'react'

import { Row, Col, Modal } from 'antd'
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom'

import errGif from '@/assets/401_images/401.gif'

import './style.less'

export const V401: React.FunctionComponent = () => {
  const [dialogVisible, setDialogVisible] = useState(false)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const back = () => {
    if (searchParams.get('noGoBack')) {
      navigate('/dashboard')
    } else {
      navigate(-1)
    }
  }
  const ewizardClap ='https://wpimg.wallstcn.com/007ef517-bafd-4066-aae4-6883632d9646'
  return (
    <div className="errPage-container">
      <Button icon="el-icon-arrow-left" className="pan-back-btn" onClick={back}>
        返回
      </Button>
      <Row>
        <Col span={12}>
          <h1 className="text-jumbo text-ginormous">
            Oops!
          </h1>
          gif来源<a href="https://zh.airbnb.com/" target="_blank">airbnb</a> 页面
          <h2>你没有权限去该页面</h2>
          <h6>如有不满请联系你领导</h6>
          <ul className="list-unstyled">
            <li>或者你可以去:</li>
            <li className="link-type">
              <NavLink to="/dashboard">回首页</NavLink>
            </li>
            <li className="link-type">
              <a href="https://www.taobao.com/">随便看看</a>
            </li>
            <li><a href="#" onClick={evt => {
              setDialogVisible(true)
              evt.preventDefault()
            }}>点我看图</a></li>
          </ul>
        </Col>
        <Col span={12}>
          <img src={errGif} width="313" height="428" alt="Girl has dropped her ice cream."/>
        </Col>
      </Row>
      <Modal visible={dialogVisible} title="随便看" onCancel={() => setDialogVisible(false)}>
        <img src={ewizardClap} className="pan-img"/>
      </Modal>
    </div>
  )
}