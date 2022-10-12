import { usePermissionState } from '@/hooks'
import { Select } from 'antd'
import React, { useEffect, useState, useRef } from 'react'
import { SvgIcon } from '../SvgIcon'
import { resolve } from 'path'
import Fuse from 'fuse.js'
import { useNavigate } from 'react-router-dom'

import './style.less'

interface SearchProps {
  className: string
}

export const Search: React.FunctionComponent<SearchProps> = ({ className, children }) => {
  const [ show, setShow ] = useState(false)
  const [ options, setOptions ] = useState([])
  const [ searchValue, setSearchValue ] = useState('')
  const selectRef = useRef(null)
  const navigate = useNavigate()
  const { permissionState: { routes } } = usePermissionState()
  const generateRoutes = (routes, basePath = '/', prefixTitle = []) => {
    let res = []

    for (const router of routes) {
      // skip hidden router
      if (router.hidden) { continue }

      const data = {
        path: resolve(basePath, router.path),
        title: [...prefixTitle]
      }

      if (router.meta && router.meta.title) {
        data.title = [...data.title, router.meta.title]

        if (router.redirect !== 'noRedirect') {
          // only push the routes with title
          // special case: need to exclude parent router without redirect
          res.push(data)
        }
      }

      // recursive child routes
      if (router.children) {
        const tempRoutes = generateRoutes(router.children, data.path, data.title)
        if (tempRoutes.length >= 1) {
          res = [...res, ...tempRoutes]
        }
      }
    }
    return res
  }
  const searchPool = generateRoutes(routes)
  const fuse = new Fuse(searchPool, {
    shouldSort: true,
    threshold: 0.4,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [{
      name: 'title',
      weight: 0.7
    }, {
      name: 'path',
      weight: 0.3
    }]
  })
  const querySearch = (value) => {
    setSearchValue(value)
    setOptions(fuse.search(value))
  }
  const closeSearch = () => {
    setOptions([])
    setSearchValue('')
    selectRef.current && selectRef.current.blur()
    setShow(false)
  }
  const onChange = (path) => {
    navigate(path)
    closeSearch()
  }
  useEffect(() => {
    document.addEventListener('click', closeSearch)
    return () => {
      document.removeEventListener('click', closeSearch)
    }
  }, [])
  return (
    <div className={'header-search ' + (show ? 'show' : '') + ' ' + className}>
      <SvgIcon className="search-icon" iconClass="search" onClick={(evt) => {
        setShow(!show)
        selectRef.current && selectRef.current.focus()
        evt.stopPropagation()
      }} />
      <Select
        ref={selectRef}
        searchValue={searchValue}
        onClick={evt=>evt.stopPropagation()}
        onSearch={value => querySearch(value) }
        filterOption={false}
        showSearch={true}
        placeholder="Search"
        className="header-search-select"
        onChange={value => onChange(value)}
      >
        {
          options.map(item => (
            <Select.Option value={item.path}>{item.title.join(' > ')}</Select.Option>
          ))
        }
      </Select>
    </div>
  )
}