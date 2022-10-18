import React from 'react'
import { Select } from 'antd'

export interface IDecoratorSelectorProps {
  value?: string
  onChange?: (value: string) => void
}

export const DecoratorSelector: React.FC<IDecoratorSelectorProps> = (props) => {
  return (
    <Select
      value={typeof props.value == 'undefined' ? 'undefined' : props.value}
      options={[
        { label: 'None', value: 'undefined' },
        { label: 'FormItem', value: 'FormItem' },
        { label: 'Row', value: 'Row' },
        { label: 'Col', value: 'Col' },
        { label: 'Container', value: 'Container' },
      ]}
      onChange={(value) => {
        props.onChange(typeof value == 'undefined' ? undefined : value)
      }}
    />
  )
}
