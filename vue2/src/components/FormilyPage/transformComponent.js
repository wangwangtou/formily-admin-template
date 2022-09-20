
import { defineComponent, h } from 'vue-demi'
import { h as _formilyH } from '@formily/vue'

export const transformNativeOn = tag => {
  return defineComponent({
    setup: function(props, { attrs, slots, listeners }) {
      return function() {
        const on = {}
        const nativeOn = {}
        Object.keys(listeners).forEach(key => {
          if (key.indexOf('native') === 0 && key.length > 6) {
            nativeOn[key.charAt(6).toLowerCase() + key.slice(7)] = listeners[key]
          } else {
            on[key] = listeners[key]
          }
        })
        var data = {
          attrs: Object.assign({}, attrs),
          on: Object.assign({}, on),
          nativeOn: Object.assign({}, nativeOn)
        }
        return _formilyH(tag, data, slots)
      }
    }
  })
}

export const wrapComponent = (component, tag, tagData) => {
  return defineComponent({
    setup: function(props, context) {
      return function() {
        const { slots, listeners, ...data } = context
        data.on = listeners
        return _formilyH(tag, tagData, {
          default: () => _formilyH(component, data, slots)
        })
      }
    }
  })
}
// export const wrapServerPagination = (name, component) => {
//   const getDefault = () => {
//     return { data: null, total: 0, current: 1, size: 10 }
//   }
//   return defineComponent({
//     name: name + 'Wp',
//     props: {
//       value: {
//         type: Object,
//         default: getDefault
//       }
//     },
//     setup: function(props, context) {
//       const splitAttrs = (attrs) => {
//         const paginationAttrs = {}
//         const componentAttrs = {}
//         Object.keys(attrs).forEach(key => {
//           if (key.indexOf('pagination') === 0 && key.length > 10) {
//             paginationAttrs[key.charAt(6).toLowerCase() + key.slice(7)] = attrs[key]
//           } else {
//             componentAttrs[key] = attrs[key]
//           }
//         })
//         return { pagination: paginationAttrs, component: componentAttrs }
//       }
//       const { slots, attrs, listeners } = context
//       const { pagination: paginationAttrs, component: componentAttrs } = splitAttrs(attrs)
//       const { pagination: paginationSlots, component: componentSlots } = splitAttrs(slots)
//       const { pagination: paginationOn, component: componentOn } = splitAttrs(listeners)
//       const { data, total, current, size } = props.value || getDefault()
//       const componentData = {
//         attrs: Object.assign({ value: data }, componentAttrs),
//         on: {
//           ...componentOn,
//           change(data) {
//             componentOn.change({ ...props.value, data })
//           }
//         }
//       }
//       const paginationData = {
//         attrs: Object.assign({ total, currentPage: current || 1, pageSize: size || 10 }, paginationAttrs),
//         on: {
//           ...paginationOn,
//           sizeChange(data) {
//             componentOn.change({ ...props.value, size: data })
//           },
//           currentChange(data) {
//             componentOn.change({ ...props.value, current: data })
//           }
//         }
//       }
//       return function() {
//         return h('div', {
//           class: 'formily-' + name + '-pagination-wrap'
//         }, [
//           h(component, componentData, componentSlots),
//           h(Pagination, paginationData, paginationSlots)
//         ])
//       }
//     }
//   })
// }
