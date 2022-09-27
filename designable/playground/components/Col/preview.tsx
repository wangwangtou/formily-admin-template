import React from 'react'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@designable/react'
import { createFieldSchema } from '../../../src/components/Field'

import { Col as FormilyCol } from '../../formily'
import { ColSource, getIcon } from '../../icons'

export const Col: DnFC<React.ComponentProps<typeof FormilyCol>> =
  FormilyCol

const ColSchema = {
  type: 'object',
  properties: {
  }
}

const ColLocale = {
  'zh-CN': {
    title: '栅格列',
    settings: {
      'x-component-props': {
      }
    }
  },
  'en-US': {
    title: 'Grid Col',
    settings: {
      'x-component-props': {
      }
    }
  }
}

Col.Behavior = createBehavior(
  {
    name: 'Col',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'Col',
    designerProps: {
      propsSchema: createFieldSchema(ColSchema)
    },
    designerLocales: ColLocale
  }
)

Col.Resource = createResource(
  {
    icon: getIcon(ColSource),
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'void',
          'x-component': 'Col'
        }
      }
    ]
  }
)
