import React, { useState } from 'react'

interface ScrollbarProps {
  wrapClass?: string,
}

export const Scrollbar: React.FunctionComponent<ScrollbarProps> = ({ wrapClass, children }) => {
  return (
    <div className={wrapClass}>
      {children}
    </div>
  )
}