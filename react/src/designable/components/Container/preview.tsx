import React from 'react'
import { createBehavior, createResource } from '@designable/core'
import { DnFC, DroppableWidget, useNodeIdProps, useTreeNode } from '@designable/react'
import { createFieldSchema } from '@designable/formily-antd/esm/components/Field'

import { getIcon } from '../../icons'
import { ContainerSchema } from '../../schemas'
import { observer } from '@formily/react'

export const Container: DnFC
= observer((props) => {
  const node = useTreeNode()
  const nodeId = useNodeIdProps()
  if (node.props['x-component'] === 'Container' && node.children.length === 0){
    return (
      <div {...props}>
        <DroppableWidget {...props} />
      </div>
    )
  }
  return (
    <div {...nodeId} {...props} className="dn-grid"/>
  )
})
  

const ContainerLocale = {
  'zh-CN': {
    title: 'DIV容器',
    settings: {
      'x-component-props': {
      }
    }
  },
  'en-US': {
    title: 'DIV',
    settings: {
      'x-component-props': {
      }
    }
  }
}

Container.Behavior = createBehavior(
  {
    name: 'Container',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'Container',
    designerProps: {
      propsSchema: createFieldSchema(ContainerSchema)
    },
    designerLocales: ContainerLocale
  }
)

Container.Resource = createResource(
  {
    icon: getIcon('Div'),
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'void',
          'x-component': 'Container',
          'x-component-props': {
          }
        }
      }
    ]
  }
)

export const AdminTitle = Container