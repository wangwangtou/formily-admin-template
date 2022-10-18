
import { DropdownSchema } from '../../schemas'
import { getPanelComponent } from '../shared'
import { Dropdown as FDropdown } from '../../formily'

export const Dropdown = getPanelComponent(
  FDropdown,
  'Dropdown',
  {
    zh: '下拉框',
    en: 'Dropdown'
  },
  DropdownSchema,
  'Dropdown'
)