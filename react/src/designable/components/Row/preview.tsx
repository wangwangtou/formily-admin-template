import React from 'react'
import { createBehavior, createResource, TreeNode } from '@designable/core'
import { DnFC, DroppableWidget, useNodeIdProps, useTreeNode } from '@designable/react'
import { createFieldSchema } from '@designable/formily-antd/esm/components/Field'

import { Row as FormilyRow } from '../../formily'
import { RowSource, getIcon } from '../../icons'

import { RowSchema } from '../../schemas'
import { observer } from '@formily/react'
import { LoadTemplate } from '@designable/formily-antd/esm/common/LoadTemplate'

export const Row: DnFC<React.ComponentProps<typeof FormilyRow>> 
= observer((props) => {
  const node = useTreeNode()
  const nodeId = useNodeIdProps()
  if (node.props['x-component'] == 'Row' && node.children.length == 0) {
    return <DroppableWidget {...nodeId}  {...props} />
  }
  return (
    <div {...nodeId} className="dn-panel">
      <FormilyRow {...props}>{props.children}</FormilyRow>
      <LoadTemplate
        actions={[
          {
            title: node.getMessage('addCol'),
            icon: 'AddColumn',
            onClick: () => {
              const beforeChild = node.children.length == 0 ? null : node.children[node.children.length]
              const defProps = {
                span: 6,
              }
              const beforeProps = !beforeChild ? defProps : (
                beforeChild.props['x-decorator'] == 'Col'
                ? beforeChild.props['x-decorator-props']
                : (
                  beforeChild.props['x-component'] == 'Col'
                ? beforeChild.props['x-component-props']
                : defProps)
              )
              const col = new TreeNode({
                componentName: 'Field',
                props: {
                  type: 'void',
                  'x-component': 'Col',
                  'x-component-props': beforeProps
                },
              })
              node.append(col)
            },
          },
        ]}
      />
    </div>
  )
})

const RowLocale = {
  'zh-CN': {
    title: '栅格行',
    addCol: '添加列',
    settings: {
      'x-component-props': {
      }
    }
  },
  'en-US': {
    title: 'Grid Row',
    addCol: 'Add Column',
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
      droppable: true,
      allowDrop: (node) => {
        const allow = node.props['x-component'] !== 'Row'
        return allow
      },
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
          'x-component': 'Row',
          'x-component-props': {
            gutter: 32,
          }
        }
      }
    ]
  }
)
