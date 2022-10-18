
import { PaginationSchema } from '../../schemas'
import { getValueRenderComponent } from '../shared'
import { Pagination as FPagination } from '../../formily'

export const Pagination = getValueRenderComponent(
  FPagination,
  'Pagination',
  {
    zh: '分页控件',
    en: 'Pagination'
  },
  PaginationSchema,
  'Pagination'
)