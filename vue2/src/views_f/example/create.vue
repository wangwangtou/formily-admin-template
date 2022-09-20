<template>
  <div class="createPost-container">
    <FormilyPage ref="page" :schema="schema" :components="components" :scope="scope" />
  </div>
</template>

<script>
import FormilyPage from '@/components/FormilyPage'
import page from 'formily/views/example/create'
import { scope, components } from './example'

export default {
  name: 'CreateArticle',
  components: { FormilyPage },
  data() {
    return {
      schema: page.schema,
      components,
      scope
    }
  }
}
</script>

<style lang="scss">
</style>
