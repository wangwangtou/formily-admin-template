
import { ButtonSchema } from '../../schemas'
import { getValueRenderComponent } from '../shared'
import { Button as FButton } from '../../formily'

export const Button = getValueRenderComponent(
  FButton,
  'Button',
  {
    zh: '按钮',
    en: 'Button'
  },
  ButtonSchema,
  'Button'
)