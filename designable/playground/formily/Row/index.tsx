import { Col as ACol, Row as ARow } from 'antd'
import React from 'react'

export const Row: React.FC = (props: any) => {
  return (
    <ARow
      {...props}
      // data-designer-node-id={props.className.match(/data-id\:([^\s]+)/)?.[1]}
    >
      {props.children}
    </ARow>
  )
}
