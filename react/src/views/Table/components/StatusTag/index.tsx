import { Tag, TagProps } from 'antd'
import React, { useState, useEffect } from 'react'

interface StatusTagProps {
  value?: string
}

export const StatusTag: React.FunctionComponent<StatusTagProps & TagProps> = (props) => {
  const statusMap = {
    published: 'success',
    draft: 'default',
    deleted: 'error'
  }
  const color = statusMap[props.value]
  return (
    <Tag {...props} color={color}>{props.value}</Tag>
  )
}