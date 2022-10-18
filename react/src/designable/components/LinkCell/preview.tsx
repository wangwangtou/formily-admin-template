import React from 'react'
import { ButtonSchema } from '../../schemas'
import { getValueRenderComponent } from '../shared'

const FLinkCell = props => {
  return (
    <span {...props}/>
  )
}

export const LinkCell = getValueRenderComponent(
  FLinkCell,
  'LinkCell',
  {
    zh: '链接单元格',
    en: 'Link Cell'
  },
  ButtonSchema,
  'LinkCell'
)