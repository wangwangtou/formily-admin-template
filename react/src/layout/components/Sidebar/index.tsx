import { useAppState, usePermissionState, useSettingState } from '@/hooks'
import React from 'react'
import { Scrollbar, SvgIcon, ElIcon } from '@/components'
import { Logo } from './logo'
import { Menu } from 'antd'
import { NavLink, useLocation } from 'react-router-dom'

import { isExternal } from '@/utils/validate'
import path from 'path'
import { ItemType } from 'antd/lib/menu/hooks/useItems'

import './style.less'

interface MenuIconProps {
  icon?: string
}

export const MenuIcon: React.FunctionComponent<MenuIconProps> = ({ icon }) => {
  return (
    !icon
    ? <></>
    : (icon.indexOf('el-icon') >= 0 ? <i className={icon + " sub-el-icon"}/> : <SvgIcon iconClass={icon} />)
  )
}

interface SidebarProps {
  // basePath?: string
}

export const Sidebar: React.FunctionComponent<SidebarProps> = ({  }) => {
  const { settingState } = useSettingState()
  const { permissionState } = usePermissionState()
  const { appState } = useAppState()
  const location = useLocation()
  const resolvePath = (routePath, basePath) => {
    if (isExternal(routePath)) {
      return { path: routePath, external: true }
    }
    if (isExternal(basePath)) {
      return { path: basePath, external: true }
    }
    return { path: path.resolve(basePath || '', routePath), external: false }
  }
  return (
    <div className={"sidebar-container " + (settingState.sidebarLogo ? 'has-logo' : '')}>
      {settingState.sidebarLogo ? <Logo collapse={!appState.sidebar.opened} /> : null }
      <Scrollbar wrap-class="scrollbar-wrapper">
        <Menu defaultOpenKeys={[]}
          mode={appState.sidebar.opened ? 'inline' : 'vertical'}
          theme="dark"
          selectedKeys={[location.pathname]}
          // style={{backgroundColor: '#304156', color: '#bfcbd9'}}
          // :default-active="activeMenu"
          // :collapse="isCollapse"
          // :background-color="variables.menuBg"
          // :text-color="variables.menuText"
          // :unique-opened="false"
          // :active-text-color="variables.menuActiveText"
          // :collapse-transition="false"
          items={permissionState.routes.map((route): ItemType => {
            if (route.hidden) return null
            let onlyOneChild = null
            const showingChildren = (route.children || []).filter(item => {
              if (item.hidden) {
                return false
              } else {
                onlyOneChild = item
                return true
              }
            })
            if (showingChildren.length <= 1) {
              onlyOneChild = onlyOneChild || { ...route, path: '', noShowingChildren: true }
              const { path: itemPath, external } = resolvePath(onlyOneChild.path, route.path)
              return {
                key: itemPath,
                // title: onlyOneChild.meta?.title,
                label: (external ? <a href={itemPath} target="_blank" >{onlyOneChild.meta?.title}</a> : <NavLink to={itemPath}>{onlyOneChild.meta?.title}</NavLink>),
                icon: <MenuIcon icon={onlyOneChild.meta?.icon} />,
              }
            }
            const { path: itemPath, external } = resolvePath(route.path, '')
            return {
              key: itemPath,
              // title: route.meta?.title,
              label: (external ? <a href={itemPath} target="_blank" >{route.meta?.title}</a> : <NavLink to={itemPath}>{route.meta?.title}</NavLink>),
              icon: <MenuIcon icon={route.meta?.icon} />,
              theme: 'dark',
              children: showingChildren.map(child => {
                const { path: itemPath, external } = resolvePath(child.path, route.path)
                return {
                  key: itemPath,
                  // title: child.meta?.title,
                  label: (external ? <a href={itemPath} target="_blank" >{child.meta?.title}</a> : <NavLink to={itemPath}>{child.meta?.title}</NavLink>),
                  icon: <MenuIcon icon={child.meta?.icon} />,
                }
              })
            }
          }).filter(item => item)}
        >
        </Menu>
      </Scrollbar>
    </div>
  )
}

export {
  Logo
}
