import { useAppState } from '@/hooks'
import { Dropdown, Menu } from 'antd'
import React, { useState } from 'react'
import { SvgIcon } from '../SvgIcon'

interface SizeSelectProps {
  className: string
}

export const SizeSelect: React.FunctionComponent<SizeSelectProps> = ({ className, children }) => {
  const { appActions: { setSize } } = useAppState()
  const sizeOptions = [
    { label: 'Default', key: 'default' },
    { label: 'Medium', key: 'medium' },
    { label: 'Small', key: 'small' },
    { label: 'Mini', key: 'mini' }
  ]
  return (
    <Dropdown overlay={<Menu items={sizeOptions} onClick={(info) => {
      setSize(info.key)
    }}></Menu>}>
      <div className={className}>
        <SvgIcon className="size-icon" iconClass="size" />
      </div>
    </Dropdown>
  )
}