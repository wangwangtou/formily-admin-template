import { message } from 'antd'
import React, { useEffect, useState } from 'react'
import screenfull from 'screenfull'
import { SvgIcon } from '../SvgIcon'

interface ScreenfullProps {
  className: string
}

export const Screenfull: React.FunctionComponent<ScreenfullProps> = ({ className, children }) => {
  const [isFullscreen, setIsFullscreen] = useState(false)
  useEffect(() => {
    const change = () => setIsFullscreen(screenfull.isFullscreen)
    if (screenfull.enabled) {
      screenfull.on('change', change)
    }
    return () => {
      if (screenfull.enabled) {
        screenfull.off('change', change)
      }
    }
  }, [])
  return (
    <div className={className}>
      <SvgIcon iconClass={isFullscreen?'exit-fullscreen':'fullscreen'} onClick={() => {
          if (!screenfull.enabled) {
            message.warn('you browser can not work')
            return false
          }
          screenfull.toggle()
        }} />
    </div>
  )
}