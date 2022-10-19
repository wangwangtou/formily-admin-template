<template>
  <div class="app-container">
    <FormilyPage ref="page" :schema="schema" :components="components" :scope="scope" schemaKey="TableDragTable">
      <FormConsumer>
        <template #default="{ form }">
          <div class="show-d">
            <el-tag>The default order :</el-tag> {{ oldList }}
          </div>
          <div class="show-d">
            <el-tag>The after dragging order :</el-tag> {{ form.values.table.map(item => item.id) }}
          </div>
        </template>
      </FormConsumer>
    </FormilyPage>
  </div>
</template>

<script>
import { FormConsumer } from '@formily/vue'
import FormilyPage from '@/components/FormilyPage'
import { Store } from 'formily/views'
// import page from 'formily/views/table/drag-table'

import RankCount from './components/RankCount'
import StatusTag from './components/StatusTag'

import { fetchList } from '@/api/article'

export default {
  name: 'DragTable',
  components: { FormilyPage, FormConsumer },
  data() {
    const self = this
    return {
      schema: Store.TableDragTable,
      components: {
        RankCount,
        StatusTag
      },
      scope: {
        PAGE: {
          useTableData() {
            return async field => {
              const { data } = await fetchList({ page: 1, limit: 10 })
              field.value = data.items

              self.oldList = data.items.map(item => item.id)
              // field.total = data.total
            }
          }
        }
      },

      oldList: []
    }
  }
  // computed: {
  //   form() {
  //     return this.$refs.page ? this.$refs.page.form : null
  //   }
  // }
}
</script>

<style>
.sortable-ghost {
  opacity: .8;
  color: #fff!important;
  background: #42b983!important;
}
</style>

