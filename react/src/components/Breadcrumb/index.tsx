import React, { useState } from 'react'
import pathToRegexp from 'path-to-regexp'

import { Breadcrumb as AntdBreadcrumb } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { useRoute } from '@/hooks'

import './style.less'

interface BreadcrumbProps {
  className: string
}

export const Breadcrumb: React.FunctionComponent<BreadcrumbProps> = ({ className, children }) => {
  const navigate = useNavigate()
  const params = useParams()

  const handleLink = item => {
    const { redirect, path } = item.route
    if (redirect) {
      navigate(redirect)
      return
    }
    navigate(path)
  }
  const route = useRoute()

  const isDashboard = route => {
    const name = route && route.name
    if (!name) {
      return false
    }
    return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
  }
  const getLevelList = () => {
    let matched = route.filter(({ route: item }) => item.meta && item.meta.title)
    const first = matched[0]
    if (!isDashboard(first)) {
      matched = [ {
        route: { path: '/dashboard', meta: { title: 'Dashboard' } }
      } ].concat(matched)
    }
  
    return matched.filter(({ route: item }) => item.meta && item.meta.title && item.meta.breadcrumb !== false)
  }
  const levelList = getLevelList()

  return (
    <AntdBreadcrumb className="app-breadcrumb" separator="/">
      {/* <transition-group name="breadcrumb"> */}
      {levelList.map((item, index) => (
        <AntdBreadcrumb.Item>
          {
            item.redirect === 'noRedirect' || index==levelList.length-1
            ? <span className="no-redirect">{ item.route.meta.title }</span>
            : <a onClick={(evt) => {
              handleLink(item)
              evt.preventDefault()
            }}>{ item.route.meta.title }</a>
          }
        </AntdBreadcrumb.Item>
      ))}
      {/* </transition-group> */}
    </AntdBreadcrumb>
  )
}