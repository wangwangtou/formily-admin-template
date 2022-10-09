import { useSettingState } from '@/hooks'
import React, { useState } from 'react'

interface RightPanelProps {
  buttonTop: String | Number,
}

import './style.less'

export const RightPanel: React.FunctionComponent<RightPanelProps> = ({ buttonTop, children }) => {
  const { settingState } = useSettingState()
  const [ show, setShow ] = useState(false) 
  return (
    <div className={"rightPanel-container " + (show ? 'show' : '')}>
      <div className="rightPanel-background" />
      <div className="rightPanel">
        <div className="handle-button" style={{'top': buttonTop+'px'}}
          onClick={() => setShow(!show) }>
          <i className={show?'el-icon-close':'el-icon-setting'} />
        </div>
        <div className="rightPanel-items">
          {children}
        </div>
      </div>
    </div>
  )
}