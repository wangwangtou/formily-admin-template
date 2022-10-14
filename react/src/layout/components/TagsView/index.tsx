import * as path from 'path'
import React, { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

import { usePermissionState, useTagsViewState, TagView, useRoute } from '@/hooks'

import './style.less'

export const TagsView: React.FunctionComponent = () => {
  const el = useRef(null)
  const { tagsViewState, tagsViewActions: {
    addVisitedView,
    addVisitedViews,
    removeVisitedView,
    removeAllVisitedView,
    removeOtherVisitedView
  } } = useTagsViewState()
  const { permissionState } = usePermissionState()
  const [menuState, setMenuState] = useState({
    left: 0,
    top: 0,
    visible: false,
    tag: null
  })
  const location = useLocation()
  const route = useRoute()
  const navigate = useNavigate()
  const isAffix = (tag: TagView) => {
    return tag?.meta?.affix
  }
  const isActive = (tag: TagView) => {
    return tag?.path === location.pathname
  }
  useEffect(() => {
    const filterAffixTags = (routes, basePath = '/') => {
      let tags = []
      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path)
          tags.push({
            path: tagPath,
            name: route.name,
            meta: { ...route.meta },
            title: route.meta.title || 'no-name',
            affix: true
          })
        }
        if (route.children) {
          const tempTags = filterAffixTags(route.children, route.path)
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags]
          }
        }
      })
      return tags
    }
    addVisitedViews(filterAffixTags(permissionState.routes))
  }, [ permissionState.routes ])

  useEffect(() => {
    const _route = route[route.length - 1]
    if (_route.route.element?.type?.name == 'Navigate') return
    const tag: TagView = {
      path: _route.pathname,
      query: location.search,
      name: _route.route?.name,
      meta: { ..._route.route?.meta },
      title: _route.route?.meta?.title || 'no-name'
    }
    addVisitedView(tag)
  }, [ location ])

  useEffect(() => {
    const closeMenu = () => setMenuState({ ...menuState, visible: false })
    if (menuState.visible) {
      document.body.addEventListener('click', closeMenu)
    }
    return () => {
      document.body.removeEventListener('click', closeMenu)
    }
  }, [ menuState.visible ])
  
  return (
    <div id="tags-view-container" className="tags-view-container" ref={el}>
      <div className="tags-view-wrapper" >
        {
          tagsViewState.visitedViews.map(tag => (
            <NavLink
              className={"tags-view-item" + (isActive(tag)?' active':'')}
              to={{ pathname: tag.path, search: tag.query }}
            >
              <span
                onContextMenu={evt => {
                  const menuMinWidth = 105
                  const offsetLeft = el.current.getBoundingClientRect().left // container margin left
                  const offsetWidth = el.current.offsetWidth // container width
                  const maxLeft = offsetWidth - menuMinWidth // left boundary
                  let left = evt.clientX - offsetLeft + 15 // 15: margin right
                  
                  if (left > maxLeft) {
                    left = maxLeft
                  }

                  const top = evt.clientY
                  const visible = true
                  setMenuState({
                    left, top, visible, tag
                  })
                  evt.preventDefault()
                }}>{ tag.title }
              { !isAffix(tag) ? <span className="el-icon-close" onClick={evt => {
                const lastTag = removeVisitedView(tag)
                if (isActive(tag)) {
                  navigate({ pathname: lastTag.path, search: lastTag.query })
                }
                evt.preventDefault()
              }} /> : null }
              </span>
            </NavLink>
          ))
        }
      </div>
      <ul style={{left:menuState.left+'px',top:menuState.top+'px', display: menuState.visible ? 'block' : 'none'}} className="contextmenu">
        {/* <li onClick={evt => {
          "refreshSelectedTag(selectedTag)"
        }}>Refresh</li> */}
        { !isAffix(menuState.tag) ? <li onClick={evt => {
          const lastTag = removeVisitedView(menuState.tag)
          if (isActive(menuState.tag)) {
            navigate({ pathname: lastTag.path, search: lastTag.query })
          }
        }}>Close</li> : null }
        <li onClick={evt => {
          removeOtherVisitedView(menuState.tag)
          if (!isActive(menuState.tag)) {
            navigate({ pathname: menuState.tag.path, search: menuState.tag.query })
          }
        }}>Close Others</li>
        <li onClick={evt => {
          const lastTag = removeAllVisitedView()
          if (!isActive(lastTag)) {
            navigate({ pathname: lastTag.path, search: lastTag.query })
          }
        }}>Close All</li>
      </ul>
    </div>
  )
}