import React, { useState } from 'react'
import { observer } from '@formily/react'
import { createBehavior, createResource } from '@designable/core'
import { DnFC, DroppableWidget, useNodeIdProps, useTreeNode } from '@designable/react'
import { createFieldSchema } from '@designable/formily-antd/esm/components/Field'

import { getIcon } from '../icons'
import './styles.less'

export const wrapEmptyTip = (Component: React.FunctionComponent, emptyContent: React.ReactNode) => {
  const newComponent = observer((props) => {
    const nodeId = useNodeIdProps()
    return (
      <div className='empty-wrap' {...nodeId}>
        <div className='empty-content'>{ emptyContent }</div>
        <div className='real-content'>
          <Component {...props}></Component>
        </div>
      </div>
    )
  })
  newComponent.displayName = Component.displayName
  return newComponent
}

export const getPanelComponent = (Component, name, titleLocale = {
  zh: 'Component',
  en: 'Component'
}, PropsSchema, icon) => {
  
  const DnComponent: DnFC<React.ComponentProps<typeof Component>>
  = observer((props) => {
    const node = useTreeNode()
    const nodeId = useNodeIdProps()
    if (node.props['x-component'] === name && node.children.length === 0){
      return (
        <Component {...props}>
          <DroppableWidget {...props} />
        </Component>
      )
    }
    return (
      <Component {...nodeId} {...props} className="dn-grid"/>
    )
  })
    

  const DnComponentLocale = {
    'zh-CN': {
      title: titleLocale.zh,
      settings: {
        'x-component-props': {
        }
      }
    },
    'en-US': {
      title: titleLocale.en,
      settings: {
        'x-component-props': {
        }
      }
    }
  }

  DnComponent.Behavior = createBehavior(
    {
      name: name,
      extends: ['Field'],
      selector: (node) => node.props['x-component'] === name,
      designerProps: {
        droppable: true,
        allowDrop: (node) => node.props['type'] === 'void',
        propsSchema: createFieldSchema(PropsSchema)
      },
      designerLocales: DnComponentLocale
    }
  )

  DnComponent.Resource = createResource(
    {
      icon: getIcon(icon),
      elements: [
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': name,
            'x-component-props': {
            }
          }
        }
      ]
    }
  )
  return DnComponent
}

export const getValueRenderComponent = (Component, name, titleLocale = {
  zh: 'Component',
  en: 'Component'
}, PropsSchema, icon) => {
  const DnComponent: DnFC<React.ComponentProps<typeof Component>>
  = observer((props) => {
    const node = useTreeNode()
    const nodeId = useNodeIdProps()
    return (
      <div {...nodeId} className="dn-input">
        <Component {...props}/>
      </div>
    )
  })
    

  const DnComponentLocale = {
    'zh-CN': {
      title: titleLocale.zh,
      settings: {
        'x-component-props': {
        }
      }
    },
    'en-US': {
      title: titleLocale.en,
      settings: {
        'x-component-props': {
        }
      }
    }
  }

  DnComponent.Behavior = createBehavior(
    {
      name: name,
      extends: ['Field'],
      selector: (node) => node.props['x-component'] === name,
      designerProps: {
        droppable: false,
        propsSchema: createFieldSchema(PropsSchema)
      },
      designerLocales: DnComponentLocale
    }
  )

  DnComponent.Resource = createResource(
    {
      icon: getIcon(icon),
      elements: [
        {
          componentName: 'Field',
          props: {
            'x-component': name,
            'x-component-props': {
            }
          }
        }
      ]
    }
  )
  return DnComponent
}

export const wrapDefaultInput = (Component: DnFC) => {
  const DnComponent: DnFC<React.ComponentProps<typeof Component>>
  = observer((props) => {
    const node = useTreeNode()
    const nodeId = useNodeIdProps()
    if (node.props['x-read-pretty']) {
      return (
        <div {...nodeId} className="dn-input">
          <Component {...props}/>
        </div>
      )
    } else {
      <Component {...props}></Component>
    }
  })
  DnComponent.Behavior = Component.Behavior
  DnComponent.Resource = Component.Resource
  DnComponent.displayName = Component.displayName
  return DnComponent
}
