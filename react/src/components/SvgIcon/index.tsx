import React, { MouseEventHandler, useState } from 'react'
import { isExternal } from '@/utils/validate'

import './style.less'

interface SvgIconProps {
  iconClass?: string,
  className?: string,
  onClick?: MouseEventHandler | undefined;
}

export const SvgIcon: React.FunctionComponent<SvgIconProps> = ({ iconClass, className, onClick }) => {
  const _isExternal = isExternal(iconClass)
  return (
    <>
      {_isExternal ? (<div style={{
        mask: `url(${iconClass}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${iconClass}) no-repeat 50% 50%`
      }} className="svg-external-icon svg-icon" onClick={onClick} />)
      : (
        <svg className={'svg-icon ' + (className ? className : '')} aria-hidden="true" onClick={onClick} >
          <use xlinkHref={`#icon-${iconClass}`} />
        </svg>
      )}
    </>
  )
}