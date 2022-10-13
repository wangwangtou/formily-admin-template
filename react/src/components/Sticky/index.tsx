import React, { useEffect, useRef, useState } from 'react'

interface StickyProps {
  stickyTop: number,
  height: number,
  zIndex: number,
  className: string,
}

export const Sticky: React.FunctionComponent<StickyProps> = ({
  stickyTop = 0,
  height,
  zIndex,
  className,
  children
}) => {
  const [state, setState] = useState({
    position: '',
    width: 'auto',
    active: false,
    isSticky: false
  })
  const el = useRef(null)
  useEffect(() => {
    const handleScroll = () => {
      if (!el.current) return
      const width = el.current.getBoundingClientRect().width
      const offsetTop = el.current.getBoundingClientRect().top
      if (offsetTop < stickyTop) {
        if (!state.active) {
          setState({
            position: 'fixed',
            active: true,
            width: width ? width + 'px' : 'auto',
            isSticky: true
          })
        }
        return
      }
      setState({
        position: '',
        width: 'auto',
        active: false,
        isSticky: false
      })
    }
    const handleResize = () => {
      if (!el.current) return
      if (state.isSticky) {
        const width = el.current.getBoundingClientRect().width
        setState({
          ...state,
          width: width ? width + 'px' : 'auto'
        })
      }
    }
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  return (
    <div style={{height:height+'px',zIndex:zIndex}} ref={el}>
      <div
        className={className}
        style={{top:(state.isSticky ? stickyTop +'px' : ''),zIndex:zIndex, position: state.position,width: state.width,height:height+'px'}}
      >
        {children}
      </div>
    </div>
  )
}