import React from 'react'
import { createBehavior, createResource } from '@designable/core'
import { DnFC, useNodeIdProps, useTreeNode } from '@designable/react'
import { createFieldSchema } from '@designable/formily-antd/esm/components/Field'
import { LoadTemplate } from '@designable/formily-antd/esm/common/LoadTemplate'

import { PanelGroup as FormilyPanelGroup } from '../../formily'
import { PanelGroupSource, getIcon } from '../../icons'

import { wrapEmptyTip } from '../shared'
import { observer } from '@formily/react'

export const PanelGroup: DnFC<React.ComponentProps<typeof FormilyPanelGroup>>
  = observer((props) => {
  const node = useTreeNode()
  const nodeId = useNodeIdProps()
  return (
    <div {...nodeId} className="dn-panel">
      <FormilyPanelGroup {...props}>{props.children}</FormilyPanelGroup>
      <LoadTemplate
        actions={[
          {
            title: node.getMessage('addItem'),
            icon: 'AddColumn',
            onClick: () => {
              const componentProps = node.props['x-component-props']
              node.setProps({
                'x-component-props': {
                  ...componentProps,
                  dataSource: [].concat(
                    ...componentProps.dataSource,
                    [ {
                      icon: 'message',
                      title: 'Item ' + (componentProps.dataSource.length + 1),
                      value: parseInt((Math.random() * 100000).toString())
                    } ]
                  )
                }
              })
            },
          },
          {
            title: node.getMessage('clearItem'),
            icon: 'Remove',
            onClick: () => {
              const componentProps = node.props['x-component-props']
              node.setProps({
                'x-component-props': {
                  ...componentProps,
                  dataSource: []
                }
              })
            },
          },
        ]}
      />
    </div>
  )
})

const PanelGroupSchema = {
  type: 'object',
  properties: {}
}

const PanelGroupLocale = {
  'zh-CN': {
    title: 'Dashboard 数字统计容器组',
    addItem: '添加块',
    clearItem: '清空块',
    settings: {
      'x-component-props': {
      }
    }
  },
  'en-US': {
    title: 'Dashboard Panel Group',
    addItem: 'Add Item',
    clearItem: 'Clear Item',
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
