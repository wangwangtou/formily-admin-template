import React, { useState, CSSProperties } from 'react'

import { Popover } from 'antd'
import { SketchPicker } from 'react-color'

export declare type ThemePickerChangeEventHandler = (theme: string, event?: Object) => void;

interface ThemePickerProps {
  style?: CSSProperties | undefined;
  theme?: string,

  onChange?: ThemePickerChangeEventHandler | undefined;
}

export const ThemePicker: React.FunctionComponent<ThemePickerProps> = ({ style, theme, onChange }) => {
  const [open, setOpen] = useState(false)
  return (
    <Popover
      visible={open}
      onVisibleChange={visible => setOpen(visible)}
      trigger="click"
      zIndex={40001}
      content={<SketchPicker
        color={theme}
        onChangeComplete={(color, event) => {
          onChange(color.hex, event)
          setOpen(false)
        }}
        colors={['#409EFF', '#1890ff', '#304156','#212121','#11a983', '#13c2c2', '#6959CD', '#f5222d']}
        className="theme-picker"
        popperClass="theme-picker-dropdown"
      />}>
      <span style={{ ...style,
          width: '26px',
          height: '26px',
          textAlign: 'center',
          lineHeight: '26px',
          border: '1px solid #e6e6e6',
          borderRadius: '3px',
          backgroundColor: theme }}>
        <i className='el-icon-arrow-down' style={{color: '#FFFFFF'}}></i>
      </span>
    </Popover>
  )
}