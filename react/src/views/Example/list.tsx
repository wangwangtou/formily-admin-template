import React from 'react'
import { FormilyPage } from '@/components'

import { RankCount } from '../Table/components/RankCount'
import { StatusTag } from '../Table/components/StatusTag'

import page from 'formily/views/example/list'
import { fetchList } from '@/api/article'
import { NavLink } from 'react-router-dom'

export const ExampleList: React.FunctionComponent = () => {
  const {
    schema, components, scope
  } = {
    schema: page,
    components: {
      RankCount,
      StatusTag,
      Container: 'div',
      RouterLink: NavLink
      // ArrayTablePagination: wrapServerPagination('array-table', ArrayTable)
    },
    scope: {
      PAGE: {
        useTablePaginationData() {
          return field => {
            field.query('.pagination').take(async pagination => {
              const { size, current } = pagination.value
              const { data } = await fetchList({ limit: size, page: current })
              field.value = data.items
              pagination.setComponentProps({
                total: data.total
              })
              pagination.visible = data.total > 0
            })
          }
        }
      }
    }
  }
  return (
    <div className="app-container">
      <FormilyPage schema={schema} components={components} scope={scope} schemaKey="ExampleList" />
    </div>
  )
}