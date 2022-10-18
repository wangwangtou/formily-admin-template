import React from 'react'
import { Checkbox as FormilyCheckbox } from '@formily/antd'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@designable/react'
import { createFieldSchema } from '@designable/formily-antd/esm/components/Field'
import { AllSchemas } from '@designable/formily-antd/esm/schemas'
import { AllLocales } from '@designable/formily-antd/esm/locales'
import { getIcon } from '@/designable/icons'

export const Checkbox: DnFC<React.ComponentProps<typeof FormilyCheckbox>> =
  FormilyCheckbox

Checkbox.Behavior = createBehavior({
  name: 'Checkbox',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Checkbox',
  designerProps: {
    propsSchema: createFieldSchema(AllSchemas.Checkbox),
  },
  designerLocales: {
    'zh-CN': {
        title: '复选框',
    },
    'en-US': {
        title: 'Checkbox',
    }
  },
}, {
  name: 'Checkbox.Group',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Checkbox.Group',
  designerProps: {
    propsSchema: createFieldSchema(AllSchemas.Checkbox.Group),
  },
  designerLocales: AllLocales.CheckboxGroup,
})

Checkbox.Resource = createResource({
  icon: getIcon('Checkbox'),
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'boolean',
        title: 'Checkbox',
        'x-decorator': 'FormItem',
        'x-component': 'Checkbox',
      },
    },
  ],
}, {
  icon: 'CheckboxGroupSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'Array<string | number>',
        title: 'Checkbox Group',
        'x-decorator': 'FormItem',
        'x-component': 'Checkbox.Group',
        enum: [
          { label: '选项1', value: 1 },
          { label: '选项2', value: 2 },
        ],
      },
    },
  ],
})
