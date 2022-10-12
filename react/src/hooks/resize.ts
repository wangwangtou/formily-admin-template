import React, { useState, useEffect } from 'react'

export const useResize = (callback) => {
  const [size, setSize] = useState([0,0,0,0])
  useEffect(() => {
    const _sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    const resize = () => {
      setSize([_sidebarElm ? _sidebarElm.clientWidth : 0,_sidebarElm ? _sidebarElm.clientHeight : 0,document.body.clientWidth,document.body.clientHeight])
      callback && callback()
    }
    const _sidebarResize = () => {
      setSize([_sidebarElm ? _sidebarElm.clientWidth : 0,_sidebarElm ? _sidebarElm.clientHeight : 0,document.body.clientWidth,document.body.clientHeight])
      callback && callback()
    }
    window.addEventListener('resize', resize)
    _sidebarElm && _sidebarElm.addEventListener('transitionend', _sidebarResize)

    return () => {
      window.removeEventListener('resize', resize)
      _sidebarElm && _sidebarElm.removeEventListener('transitionend', _sidebarResize)
    }
  }, [])
  return size;
}