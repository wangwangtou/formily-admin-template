import React from 'react'

import { ThemePicker } from '@/components'
import { Switch } from 'antd'
import { useSettingState } from '@/hooks'

import './style.less'

export const Settings: React.FunctionComponent = () => {
  const { settingState, settingActions } = useSettingState()
  return (
    <div className="drawer-container">
      <div>
        <h3 className="drawer-title">Page style setting</h3>

        <div className="drawer-item">
          <span>Theme Color</span>
          <ThemePicker theme={settingState.theme} style={
            { float: 'right', height: '26px', margin: '-3px 8px 0 0' }
          } onChange={value => settingActions.changeSetting({ key: 'theme', value })} />
        </div>

        <div className="drawer-item">
          <span>Open Tags-View</span>
          <Switch checked={settingState.tagsView}
            onChange={value => settingActions.changeSetting({ key: 'tagsView', value })}
            className="drawer-switch" />
        </div>

        <div className="drawer-item">
          <span>Fixed Header</span>
          <Switch checked={settingState.fixedHeader}
            onChange={value => settingActions.changeSetting({ key: 'fixedHeader', value })}
            className="drawer-switch" />
        </div>

        <div className="drawer-item">
          <span>Sidebar Logo</span>
          <Switch checked={settingState.sidebarLogo}
            onChange={value => settingActions.changeSetting({ key: 'sidebarLogo', value })}
            className="drawer-switch" />
        </div>
      </div>
    </div>
  )
}