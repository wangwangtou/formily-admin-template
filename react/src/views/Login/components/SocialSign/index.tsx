import React from 'react'

import { SvgIcon } from '@/components'

export const SocialSign: React.FunctionComponent = () => {
  const socialHandleClick = (socialType) => {
    alert(socialType)
  }
  return (
    <div className="social-signup-container">
      <div className="sign-btn" onClick={() => socialHandleClick('wechat')}>
        <span className="wx-svg-container"><SvgIcon iconClass="wechat" className="icon" /></span>
        WeChat
      </div>
      <div className="sign-btn" onClick={() => socialHandleClick('tencent')}>
        <span className="qq-svg-container"><SvgIcon iconClass="qq" className="icon" /></span>
        QQ
      </div>
    </div>
  )
}