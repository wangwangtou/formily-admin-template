import { connect, mapProps, useField } from '@formily/vue'
import { Button, Link, Tooltip as ElTooltip, Row, Col, Pagination as ElPagination, Rate as ElRate } from 'element-ui'
import { defineComponent, h, onMounted, getCurrentInstance } from 'vue-demi'
import SortableJs from 'sortablejs'

function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

const formaters = {
  timestamp: (value, format, defVal) => {
    return parseTime(value, format)
  },
  map: (value, format, defVal) => {
    return format[value] || defVal || value
  }
}

const InputNative = 'input'
const AdminTitle = 'div'
const FormatPreview = defineComponent({
  props: { type: String, format: String | Object | Array | Number, default: String, value: Number | String | Date },
  setup(props, ctx) {
    const { attrs, ...data } = ctx
    data.attrs = attrs
    const previewText = formaters[props.type](props.value, props.format, props.default)
    return function() {
      return h('span', data, [previewText])
    }
  }
})
const Sortable = defineComponent({
  props: {
    arrayField: String,
    containerSelector: String,
    ghostClass: {
      type: String,
      default: 'sortable-ghost'
    }
  },
  setup(props, { attrs, slots, ...data }) {
    var fieldRef = useField()
    onMounted(() => {
      const vm = getCurrentInstance()
      const elm = vm.vnode.elm
      const el = elm.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
      SortableJs.create(el, {
        ghostClass: props.ghostClass, // Class name for the drop placeholder,
        setData: function(dataTransfer) {
          // to avoid Firefox bug
          // Detail see : https://github.com/RubaXa/Sortable/issues/1012
          dataTransfer.setData('Text', '')
        },
        onEnd: evt => {
          const { oldIndex, newIndex } = evt
          const arrayField = fieldRef.value.query(props.arrayField).take()
          arrayField.move(oldIndex, newIndex)
          // const targetRow = this.list.splice(evt.oldIndex, 1)[0]
          // this.list.splice(evt.newIndex, 0, targetRow)

          // // for show the changes, you can delete in you code
          // const tempIndex = this.newList.splice(evt.oldIndex, 1)[0]
          // this.newList.splice(evt.newIndex, 0, tempIndex)
        }
      })
    })
    data.attrs = attrs
    return function() {
      return h('div', data, slots.default())
    }
  }
})
const Tooltip = connect(ElTooltip, mapProps((props, field) => {
  return {
    value: props.open
  }
}))
const Rate = connect(ElRate)
const getPaginationDefault = () => {
  return { current: 1, size: 10 }
}
const Pagination = defineComponent({
  name: 'Pagination',
  props: {
    value: {
      type: Object,
      default: getPaginationDefault
    }
  },
  setup: function(props, { attrs, slots, listeners: on, ...data }) {
    return function() {
      const { current, size } = props.value || getPaginationDefault()
      const paginationData = {
        attrs: Object.assign({ currentPage: current || 1, pageSize: size || 10 }, attrs),
        on: {
          ...on,
          'size-change'(data) {
            on.change && on.change({ ...props.value, size: data })
            on.sizeChange && on.sizeChange(data)
          },
          'current-change'(data) {
            on.change && on.change({ ...props.value, current: data })
            on.currentChange && on.currentChange(data)
          }
        }
      }
      return h(ElPagination, paginationData, slots)
    }
  }
})

export {
  Sortable, Row, Col, Button, Link, Tooltip, Pagination, FormatPreview, InputNative, AdminTitle, Rate
}
