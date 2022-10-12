import React from 'react'

import { Card, Progress } from 'antd'
import { PanThumb } from '@/components/PanThumb'
import { Mallki } from '@/components/TextHoverEffect'
import { useUserState } from '@/hooks'

import './style.less'

export const BoxCard: React.FunctionComponent = () => {
  const { userState } = useUserState()
  return (
    <Card className="box-card-component" style={{marginLeft:'8px'}}
      title={
        <div className="box-card-header">
          <img src="https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png"/>
        </div>
      }>
      <div style={{position:'relative'}}>
        <PanThumb image={userState.avatar} className="panThumb" />
        <Mallki className="mallki-text" text="vue-element-admin" />
        <div style={{paddingTop:'35px'}} className="progress-item">
          <span>Vue</span>
          <Progress percent={70} />
        </div>
        <div className="progress-item">
          <span>JavaScript</span>
          <Progress percent={18} />
        </div>
        <div className="progress-item">
          <span>CSS</span>
          <Progress percent={12} />
        </div>
        <div className="progress-item">
          <span>ESLint</span>
          <Progress percent={100} status="success" />
        </div>
      </div>
    </Card>
  )
}