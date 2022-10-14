<template>
  <div class="app-container">
    <FormilyPage ref="page" :schema="schema" :components="components" :scope="scope" />
  </div>
</template>

<script>
import FormilyPage from '@/components/FormilyPage'
import page from 'formily/views/table/inline-edit-table'

import RankCount from './components/RankCount'
import StatusTag from './components/StatusTag'

import { fetchList } from '@/api/article'
import { defineComponent, h, ref } from 'vue-demi'
import { mapReadPretty, useField, connect } from '@formily/vue'
import { observable } from '@formily/reactive'
import { observer } from '@formily/reactive-vue'
import { Button, Message } from 'element-ui'
import { PreviewText, Input } from '@formily/element'

const EditButton = observer(defineComponent({
  name: 'EditButton',
  props: {
    fields: {
      type: Array,
      default() { return [] }
    }
  },
  setup(props, { slots, ...data }) {
    const fieldRef = useField()
    const editRef = observable.computed(() => {
      let val = false
      props.fields.forEach(field => {
        const editField = fieldRef.value.query('.' + field).take()
        val = val || editField.selfPattern === 'editable'
      })
      return val
    })
    const edit = () => {
      props.fields.forEach(field => {
        const editField = fieldRef.value.query('.' + field).take()
        editField.setPattern('editable')
      })
    }
    const ok = () => {
      props.fields.forEach(field => {
        const editField = fieldRef.value.query('.' + field).take()
        editField.setPattern('readPretty')
      })
    }
    return function() {
      const attrs = !editRef.value ? {
        type: 'primary',
        size: 'small',
        icon: 'el-icon-edit'
      } : {
        type: 'success',
        size: 'small',
        icon: 'el-icon-circle-check-outline'
      }
      const on = {
        click: editRef.value ? ok : edit
      }
      return h(Button, {
        attrs: Object.assign(attrs, data.attrs),
        on
      }, editRef.value ? (slots.ok ? [slots.ok()] : ['Ok']) : (slots.edit ? [slots.edit()] : ['Edit']))
    }
  }
})
)

const wrapWithCancel = component => {
  return defineComponent({
    name: 'InputWithCancel',
    setup(props, { slots, attrs, listeners, ...data }) {
      const fieldRef = useField()
      const oldValueRef = ref(fieldRef.value.value)
      const cancel = () => {
        fieldRef.value.setValue(oldValueRef.value)
        fieldRef.value.setPattern('readPretty')
        Message({
          message: 'The title has been restored to the original value',
          type: 'warning'
        })
      }
      return function() {
        return h('div', {}, [
          h(component, {
            style: {
              paddingRight: '100px'
            },
            attrs: Object.assign({}, attrs),
            on: Object.assign({}, listeners)
          }, slots),
          h(Button, {
            style: {
              position: 'absolute',
              right: '15px',
              top: '10px'
            },
            props: {
              class: 'cancel-btn',
              size: 'small',
              icon: 'el-icon-refresh',
              type: 'warning'
            },
            on: {
              click: cancel
            }
          }, [slots.cancel ? slots.cancel() : 'cancel'])
        ])
      }
    }
  })
}

export default {
  name: 'InlineEditTable',
  components: { FormilyPage },
  data() {
    return {
      schema: page.schema,
      components: {
        RankCount,
        StatusTag,
        PAGE: {
          EditButton,
          InputWithCancel: connect(wrapWithCancel(Input), mapReadPretty(PreviewText.Input))
        }
      },
      scope: {
        PAGE: {
          useTableData() {
            return async field => {
              const { data } = await fetchList({ page: 1, limit: 10 })
              field.value = data.items
            }
          }
        }
      }
    }
  }
}
</script>

<style>
.sortable-ghost {
  opacity: .8;
  color: #fff!important;
  background: #42b983!important;
}
</style>

