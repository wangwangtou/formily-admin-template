
import { getEnumValueRenderSchema } from '../../schemas'
import { getValueRenderComponent } from '../shared'
import { StatusTag as FStatusTag } from '../../formily'

export const StatusTag = getValueRenderComponent(
  FStatusTag,
  'StatusTag',
  {
    zh: '状态标签',
    en: 'Status Tag'
  },
  getEnumValueRenderSchema(['published', 'draft']),
  'Status Tag'
)