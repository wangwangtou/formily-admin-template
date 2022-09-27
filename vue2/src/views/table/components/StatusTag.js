import { defineComponent, h } from 'vue-demi'
import { observer } from '@formily/reactive-vue'
import { Tag } from 'element-ui'
export default observer(defineComponent({
  setup(props, ctx) {
    const { attrs, ...data } = ctx
    const statusMap = {
      published: 'success',
      draft: 'info',
      deleted: 'danger'
    }
    // data.props = {
    //   type: statusMap[attrs.value]
    // }
    // data.attrs = attrs
    return function() {
      data.props = {
        type: statusMap[attrs.value]
      }
      data.attrs = attrs
      return h(Tag, data, [attrs.value])
    }
  }
}))
