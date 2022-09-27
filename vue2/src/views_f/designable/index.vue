<template>
  <Designable v-if="elKey > 0" :key="elKey" />
</template>

<script>

import Designable from '@/components/Designable'

import * as FormilyViews from 'formily/views'

export default {
  name: 'DesignablePage',
  components: {
    Designable
  },
  data() {
    return {
      data: null,
      seed: 0,
      elKey: 0
    }
  },
  computed: {
    schemaKey() {
      return this.$route.query.key
    }
  },
  watch: {
    schemaKey() {
      if (this.schemaKey) {
        this.load()
      } else {
        this.elKey = 0
      }
    }
  },
  mounted() {
    if (this.schemaKey) {
      this.load()
    }
  },
  methods: {
    load() {
      const data = FormilyViews[this.schemaKey] || null
      localStorage.setItem('formily-schema', JSON.stringify(data))
      this.elKey = ++this.seed
    }
  }
}
</script>

<style>
</style>
