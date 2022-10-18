
import { StickySchema } from '../../schemas'
import { getPanelComponent } from '../shared'
import { Sticky as FSticky } from '../../formily'

export const Sticky = getPanelComponent(
  FSticky,
  'Sticky',
  {
    zh: '固定位置容器',
    en: 'Sticky'
  },
  StickySchema,
  'Sticky'
)