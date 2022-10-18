import React from 'react'
import { createBehavior, createResource } from '@designable/core'
import { DnFC, DroppableWidget, useNodeIdProps, useTreeNode } from '@designable/react'
import { createFieldSchema } from '@designable/formily-antd/esm/components/Field'

import { Col as FormilyCol } from '../../formily'
import { ColSource, getIcon } from '../../icons'
import { ColSchema } from '../../schemas'
import { observer } from '@formily/react'

export const Col: DnFC<React.ComponentProps<typeof FormilyCol>>
= observer((props) => {
  const node = useTreeNode()
  const nodeId = useNodeIdProps()
  if (node.props['x-component'] === 'Col' && node.children.length === 0){
    return (
      <FormilyCol {...props}>
        <DroppableWidget {...props} />
      </FormilyCol>
    )
  }
  return (
    <FormilyCol {...nodeId} {...props} className="dn-grid"/>
  )
})
  

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
      droppable: true,
      allowDrop: (node) => node.props['x-component'] === 'Row',
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
          'x-component': 'Col',
          'x-component-props': {
            span: 6,
          }
        }
      }
    ]
  }
)
