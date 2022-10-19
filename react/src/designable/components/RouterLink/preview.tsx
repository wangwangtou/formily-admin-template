import React from 'react'
import { createBehavior, createResource } from '@designable/core'
import { DnFC, DroppableWidget, useNodeIdProps, useTreeNode } from '@designable/react'
import { createFieldSchema } from '@designable/formily-antd/esm/components/Field'

import { getIcon } from '../../icons'
import { RouterLinkSchema } from '../../schemas'
import { observer } from '@formily/react'

// 不使用 react-router 里的NavLink， 避免与 vue 的 hash 冲突
const NavLink = (props) => {
  return (
    <a {...props} href="javascript:;" onClick={
      evt => {
        let hash = ''
        if (typeof props.to == 'string') {
          hash = props.to
        } else if (props.to && props.to.path) {
          hash = JSON.stringify(props.to)
        }
        console.log('NavLink to:', hash)
      }
    }/>
  )
}

export const RouterLink: DnFC
= observer((props) => {
  const node = useTreeNode()
  const nodeId = useNodeIdProps()
  if (node.props['x-component'] === 'RouterLink' && node.children.length === 0){
    return (
      <NavLink {...props}>
        <DroppableWidget {...props} />
      </NavLink>
    )
  }
  return (
    <NavLink {...nodeId} {...props} className="dn-grid"/>
  )
})
  

const RouterLinkLocale = {
  'zh-CN': {
    title: 'Route Link',
    settings: {
      'x-component-props': {
      }
    }
  },
  'en-US': {
    title: 'Route Link',
    settings: {
      'x-component-props': {
      }
    }
  }
}

RouterLink.Behavior = createBehavior(
  {
    name: 'RouterLink',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'RouterLink',
    designerProps: {
      propsSchema: createFieldSchema(RouterLinkSchema)
    },
    designerLocales: RouterLinkLocale
  }
)

RouterLink.Resource = createResource(
  {
    icon: getIcon('Link'),
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'void',
          'x-component': 'RouterLink',
          'x-component-props': {
          }
        }
      }
    ]
  }
)
