<template>
  <FormProvider :key="renderKey" :form="form">
    <slot name="before" />
    <SchemaField :schema="schema" :components="components" :scope="scopeWithAT" />
    <slot name="default" />
  </FormProvider>
</template>

<script>
import { createForm } from '@formily/core'
import { FormProvider, FormConsumer, createSchemaField } from '@formily/vue'

import * as FormilyElement from '@formily/element'
import * as ProjectComponents from './projectComponents'
import { transformNativeOn } from './transformComponent'
import * as AdminTemplateScope from './adminTemplateScope'

const { SchemaField } = createSchemaField({
  components: {
    ...FormilyElement,
    Input: Object.assign(
      transformNativeOn(FormilyElement.Input),
      {
        TextArea: transformNativeOn(FormilyElement.Input.TextArea)
      }
    ),
    Password: transformNativeOn(FormilyElement.Password),
    Radio: FormilyElement.Radio,
    ...ProjectComponents
  }
})

export {
  SchemaField
}

export default {
  components: {
    FormProvider,
    FormConsumer,
    FormItem: FormilyElement.FormItem,
    SchemaField
  },
  props: {
    schema: {
      type: Object,
      default() { return {} }
    },
    components: {
      type: Object,
      default() { return {} }
    },
    scope: {
      type: Object,
      default() { return {} }
    },
    effects: {
      type: Function,
      default() { return null }
    }
  },
  data() {
    const form = createForm({
      effects: () => {
        this.effects && this.effects()
      }
    })
    return {
      renderKey: 1,
      form
    }
  },
  computed: {
    scopeWithAT() {
      return {
        ...AdminTemplateScope,
        ...this.scope
      }
    }
  },
  watch: {
    schema() {
      this.renderKey++
    }
  }
}
</script>

<style scoped>
</style>
