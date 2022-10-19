<template>
  <div class="createPost-container">
    <FormilyPage ref="page" :schema="schema" :components="components" :scope="scope" :effects="effects" schemaKey="ExampleEdit" />
  </div>
</template>

<script>
import FormilyPage from '@/components/FormilyPage'
import { Store } from 'formily/views'
import { scope, components } from './example'

import { onFormReact } from '@formily/core'
import { action } from '@formily/reactive'
import { fetchArticle } from '@/api/article'

export default {
  name: 'EditArticle',
  components: { FormilyPage },
  data() {
    return {
      schema: Store.ExampleEdit,
      components,
      scope,
      effects: () => {
        onFormReact(async form => {
          const id = this.id
          const response = await fetchArticle(id)
          const article = response.data
          article.title += `   Article Id:${article.id}`
          article.content_short += `   Article Id:${article.id}`
          this.setTagsViewTitle()
          this.setPageTitle()

          article.displayTime = new Date(article.display_time)
          article.comment_disabled = article.comment_disabled ? 'closed' : 'opened'
          form.setInitialValues(article)
        })
      }
    }
  },
  computed: {
    id() {
      return this.$route.params && this.$route.params.id
    }
  },
  created() {
    const id = this.id
    if (!id) {
      this.$router.push('/example/create')
      return
    }
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    setTagsViewTitle() {
      const title = 'Edit Article'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.id}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = 'Edit Article'
      document.title = `${title} - ${this.id}`
    }
  }
}
</script>

<style lang="scss">
</style>
