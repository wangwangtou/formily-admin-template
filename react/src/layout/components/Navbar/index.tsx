import React from 'react'

import {
  Breadcrumb,
  Hamburger,
  ErrorLog,
  Screenfull,
  SizeSelect,
  Search,
} from '@/components'

import {
  Tooltip,
  Dropdown,
  Menu,
  Button,
} from 'antd'

import { useAppState, useUserState } from '@/hooks'
import { NavLink } from 'react-router-dom'

import './style.less'

const vueAddress = process.env.REACT_APP_VUE_EXAMPLE_ADDRESS

export const Navbar: React.FunctionComponent = () => {
  const { appState: {
    sidebar,
    device
  }, appActions: {
    toggleSidebar
  } } = useAppState()

  const { userState, userActions: { logout } } = useUserState()
  return (
    <div className="navbar">
      <Hamburger isActive={sidebar.opened} className="hamburger-container" onClick={() => toggleSidebar()} />
      <Breadcrumb className="breadcrumb-container" />
      <div className="right-menu">
        {device != 'mobile' ? (
          <>
            {vueAddress ? <div className="right-menu-item">
              <Button size="small" onClick={() => {
                location.href = vueAddress
              }}>Vue</Button>
            </div> : null }
            <Search className="right-menu-item" />

            <ErrorLog className="errLog-container right-menu-item hover-effect" />

            <Screenfull className="right-menu-item hover-effect" />

            <Tooltip title="Global Size" placement="bottom">
              <SizeSelect className="right-menu-item hover-effect" />
            </Tooltip>
          </>
        ) : <></>}

        <Dropdown 
          trigger={["click"]}
          overlay={() => {
            return (
              <Menu items={[
                { title: 'Profile', key: 'profile', label: <NavLink to="/profile/index">Profile</NavLink> },
                { title: 'Dashboard', key: 'dashboard', label: <NavLink to="/">Dashboard</NavLink> },
                { title: 'Github', key: 'github', label: <a href='https://github.com/wangwangtou/formily-admin-template'>Github</a> },
                { type: 'divider' },
                { title: 'Log Out', key: 'logout', label: <span style={{display:'block'}} onClick={() => logout()}>Log Out</span> }
              ]}></Menu>
            )
          }}>
          <div className="avatar-container right-menu-item hover-effect">
            <div className="avatar-wrapper">
              <img src={userState.avatar+'?imageView2/1/w/80/h/80'} className="user-avatar"/>
              <i className="el-icon-caret-bottom" />
            </div>
          </div>
        </Dropdown>
      </div>
    </div>
  )
}