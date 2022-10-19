<template>
  <div class="app-container">
    <FormilyPage ref="page" :schema="schema" :components="components" :scope="scope" schemaKey="ExampleList" />
  </div>
</template>

<script>
import FormilyPage from '@/components/FormilyPage'
import { Store } from 'formily/views'

import RankCount from '../table/components/RankCount'
import StatusTag from '../table/components/StatusTag'

import { fetchList } from '@/api/article'

export default {
  name: 'ArticleList',
  components: { FormilyPage },
  data() {
    return {
      schema: Store.ExampleList,
      components: {
        RankCount,
        StatusTag,
        Container: 'div',
        RouterLink: 'router-link'
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
  }
}
</script>

<style>
.pagination-container {
  background: #fff;
  padding: 32px 16px;
}
</style>

