import { SchemaField } from './index.vue'
import { FormLayout } from '@formily/element'
import * as AdminTemplateScope from './adminTemplateScope'

/**
 * @param {import('../../../../formily/index').DesignablePage} page
 * @param {{ footer: Function, }} opt
 * @returns {Component}
 */
export const getFormDialogComponent = (page, opt) => {
  opt = opt || {}
  return {
    props: ['form'],
    data() {
      return {
        schema: page.schema,
        components: opt.components,
        scope: Object.assign({}, AdminTemplateScope, opt.scope)
      }
    },
    render(createElement) {
      return createElement(FormLayout, {
        attrs: {
          ...page.form
        }
      }, [
        createElement(SchemaField, {
          props: {
            schema: this.schema,
            components: this.components,
            scope: this.scope
          }
        }),
        opt.footer ? opt.footer(createElement) : null
      ])
    }
  }
}
