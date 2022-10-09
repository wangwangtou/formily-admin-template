import React, { useState } from 'react'

interface ElIconProps {
  name?: string,
  className?: string,
}

import './icon.css'

export const ElIcon: React.FunctionComponent<ElIconProps> = ({ name, className }) => {
  return (
    <i className={'el-icon-' + name + ' ' + className}></i>
  )
}