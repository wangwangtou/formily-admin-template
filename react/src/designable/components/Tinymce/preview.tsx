
import { TinymceSchema } from '../../schemas'
import { getValueRenderComponent } from '../shared'
import { Tinymce as FTinymce } from '../../formily'

export const Tinymce = getValueRenderComponent(
  FTinymce,
  'Tinymce',
  {
    zh: 'Tinymce富文本',
    en: 'Tinymce Rich Text'
  },
  TinymceSchema,
  'Rich Text'
)