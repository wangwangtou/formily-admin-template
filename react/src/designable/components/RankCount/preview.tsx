
import { NumberValueRenderSchema } from '../../schemas'
import { getValueRenderComponent } from '../shared'
import { RankCount as FRankCount } from '../../formily'

export const RankCount = getValueRenderComponent(
  FRankCount,
  'RankCount',
  {
    zh: '评分显示',
    en: 'Rank Count'
  },
  NumberValueRenderSchema,
  'Rank Count'
)