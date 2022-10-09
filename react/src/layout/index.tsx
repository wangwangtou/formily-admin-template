import React from 'react'
import { useAppState, useSettingState } from '@/hooks'
import { RightPanel } from '@/components/RightPanel'
import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components'

// import lessModule from './style.module.less'
import './style.less'

export const Layout: React.FunctionComponent = ({ children }) => {
  const { appState, appActions: { closeSidebar } } = useAppState()
  const { settingState } = useSettingState()
  const wrapperClass = [
    // lessModule['app-wrapper'],
    // appState.sidebar.opened ? lessModule['openSidebar'] : lessModule['hideSidebar'],
    // appState.sidebar.withoutAnimation ? lessModule['withoutAnimation'] : '',
    'app-wrapper',
    appState.sidebar.opened ? 'openSidebar' : 'hideSidebar',
    appState.sidebar.withoutAnimation ? 'withoutAnimation' : '',
    appState.device == 'mobile' ? 'mobile' : ''
  ]
  const needTagsView = settingState.tagsView
  const fixedHeader = settingState.fixedHeader
  const showSettings = settingState.showSettings
  return (
    <div className={wrapperClass.join(' ')}>
      {appState.device==='mobile' && appState.sidebar.opened ? <div className="drawer-bg" onClick={() => closeSidebar(false)} /> : null}
      <Sidebar />
      <div className={"main-container "+ (needTagsView ? "hasTagsView" : "")}>
        <div className={fixedHeader ? 'fixed-header' : ""}>
          <Navbar />
          {needTagsView ? <TagsView v-if="needTagsView" /> : null}
        </div>
        <AppMain children={children} />
        {
          showSettings ? 
            <RightPanel buttonTop={"380"}>
              <Settings />
            </RightPanel>
          : null
        }
      </div>
    </div>
  )
}

export default Layout
