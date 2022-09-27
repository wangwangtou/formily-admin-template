import React from 'react'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@designable/react'
import { createFieldSchema } from '../../../src/components/Field'

import { Row as FormilyRow } from '../../formily'
import { RowSource, getIcon } from '../../icons'

export const Row: DnFC<React.ComponentProps<typeof FormilyRow>> =
  FormilyRow

const RowSchema = {
  type: 'object',
  properties: {
  }
}

const RowLocale = {
  'zh-CN': {
    title: '栅格列',
    settings: {
      'x-component-props': {
      }
    }
  },
  'en-US': {
    title: 'Grid Row',
    settings: {
      'x-component-props': {
      }
    }
  }
}

Row.Behavior = createBehavior(
  {
    name: 'Row',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'Row',
    designerProps: {
      propsSchema: createFieldSchema(RowSchema)
    },
    designerLocales: RowLocale
  }
)

Row.Resource = createResource(
  {
    icon: getIcon(RowSource),
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'void',
          'x-component': 'Row'
        }
      }
    ]
  }
)
