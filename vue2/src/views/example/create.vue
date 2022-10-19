<template>
  <div class="createPost-container">
    <FormilyPage ref="page" :schema="schema" :components="components" :scope="scope" schemaKey="ExampleCreate" />
  </div>
</template>

<script>
import FormilyPage from '@/components/FormilyPage'
import { Store } from 'formily/views'
// import page from 'formily/views/example/create'
import { scope, components } from './example'

export default {
  name: 'CreateArticle',
  components: { FormilyPage },
  data() {
    return {
      schema: Store.ExampleCreate,
      components,
      scope
    }
  }
}
</script>

<style lang="scss">
</style>
