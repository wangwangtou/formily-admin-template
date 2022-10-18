
import { FormatPreviewSchema } from '../../schemas'
import { getValueRenderComponent } from '../shared'
import { FormatPreview as FFormatPreview } from '../../formily'

export const FormatPreview = getValueRenderComponent(
  FFormatPreview,
  'FormatPreview',
  {
    zh: '格式化显示',
    en: 'Format Preview'
  },
  FormatPreviewSchema,
  'FormatPreview'
)