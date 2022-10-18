
import { getEnumValueRenderSchema } from '../../schemas'
import { getChartComponents } from '../Charts/preview'
import { Warning as FWarning } from '../../formily'

export const Warning = getChartComponents('Warning', FWarning, {
  zh: '提示信息',
  en: 'Warning Tip',
}, null, 'Waring')
