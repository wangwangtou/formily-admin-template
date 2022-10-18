
import { TagSchema } from '../../schemas'
import { getPanelComponent } from '../shared'
import { Tag as FTag } from '../../formily'

export const Tag = getPanelComponent(
  FTag,
  'Tag',
  {
    zh: '标签',
    en: 'Tag'
  },
  TagSchema,
  'Tag'
)