<template>
  <div ref='div'></div>
</template>

<script>

import { loadModule } from './systemLoader'
import { Store } from 'formily/views'

export default {
  name: 'Designable',
  data() {
    return {
      _ReactDOM: null
    }
  },
  async mounted() {
    const { React, ReactDOM, Editor } = await loadModule('editor')
    this._ReactDOM = ReactDOM
    const params = this.$route.query
    ReactDOM.render(React.createElement(Editor, {
      editKey: params.key,
      editData: Store[params.key],
      returnPath: params.returnPath,
      onSaveData: (data) => {
        Store.save(params.key || '__draft__', data)
      }
    }), this.$refs.div)
  },
  destroyed() {
    this._ReactDOM.unmountComponentAtNode(this.$refs.div)
  }
}
</script>

<style>

</style>