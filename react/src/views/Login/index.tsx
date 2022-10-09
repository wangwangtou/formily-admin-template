import React, { useState } from 'react'

import { Button, Modal } from 'antd'
import { FormilyPage } from '@/components'
import { SocialSign } from './components'
import schema from 'formily/views/login'

import './style.less'

export const Login: React.FunctionComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="login-container">
      <div className="login-form">
        <div className="title-container">
          <h3 className="title">Login Form</h3>
        </div>
        <FormilyPage schema={schema} schemaKey="Login" />
        <div style={{position: "relative"}}>
          <div className="tips">
            <span>Username : admin</span>
            <span>Password : any</span>
          </div>
          <div className="tips">
            <span style={{marginRight:'18px'}}>Username : editor</span>
            <span>Password : any</span>
          </div>

          <Button className="thirdparty-button" type="primary" onClick={() => setIsModalOpen(true)}>
            Or connect with
          </Button>
        </div>
      </div>
      <Modal title="Or connect with" visible={isModalOpen}
        footer={null}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}>
        Can not be simulated on local, so please combine you own business simulation! ! !
        <br/>
        <br/>
        <br/>
        <SocialSign />
      </Modal>
    </div>
  )
}
