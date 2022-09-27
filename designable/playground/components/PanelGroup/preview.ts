import React from 'react'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@designable/react'
import { createFieldSchema } from '../../../src/components/Field'

import { PanelGroup as FormilyPanelGroup } from '../../formily'
import { PanelGroupSource, getIcon } from '../../icons'

export const PanelGroup: DnFC<React.ComponentProps<typeof FormilyPanelGroup>> =
  FormilyPanelGroup

const PanelGroupSchema = {
  type: 'object',
  properties: {}
}

const PanelGroupLocale = {
  'zh-CN': {
    title: 'Dashboard 数字统计容器组',
    settings: {
      'x-component-props': {
      }
    }
  },
  'en-US': {
    title: 'Dashboard Panel Group',
    settings: {
      'x-component-props': {
      }
    }
  }
}

PanelGroup.Behavior = createBehavior(
  {
    name: 'PanelGroup',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'PanelGroup',
    designerProps: {
      propsSchema: createFieldSchema(PanelGroupSchema)
    },
    designerLocales: PanelGroupLocale
  }
)

PanelGroup.Resource = createResource(
  {
    icon: getIcon(PanelGroupSource),
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'void',
          'x-component': 'PanelGroup'
        }
      }
    ]
  }
)
