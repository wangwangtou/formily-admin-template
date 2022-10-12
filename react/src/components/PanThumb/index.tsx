import React, { useState, useEffect } from 'react'
import './style.less'

interface PanThumbProps {
  className?: string,
  image: string,
  zIndex?: number,
  width?: string,
  height?: string
}

export const PanThumb: React.FunctionComponent<PanThumbProps> = ({
  className,
  image,
  zIndex,
  width,
  height,
  children,
}) => {
  return (
    <div style={{zIndex:zIndex || 1,height:height || '150px',width:width || '150px'}} className={"pan-item " + className}>
      <div className="pan-info">
        <div className="pan-info-roles-container">
          {children}
        </div>
      </div>
      <div style={{backgroundImage: `url(${image})`}} className="pan-thumb"></div>
    </div>
  )
}