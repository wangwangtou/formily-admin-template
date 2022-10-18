import React, { useEffect, useContext } from 'react'
import { Space, Button, Radio, message } from 'antd'
import { useDesigner, TextWidget } from '@designable/react'
import { GlobalRegistry } from '@designable/core'
import { observer } from '@formily/react'
import {
  transformToSchema,
  transformToTreeNode,
} from '@designable/formily-transformer'
import { DesignableContext } from '../context'

export const ActionsWidget = observer(() => {
  const designer = useDesigner()
  const { saveData, currentData, editKey, returnPath } = useContext(DesignableContext)
  useEffect(() => {
    try {
      designer.setCurrentTree(
        transformToTreeNode(currentData?.current)
      )
    } catch {}
  }, [ currentData ])
  const supportLocales = ['zh-cn', 'en-us', 'ko-kr']
  useEffect(() => {
    if (!supportLocales.includes(GlobalRegistry.getDesignerLanguage())) {
      GlobalRegistry.setDesignerLanguage('zh-cn')
    }
  }, [])
  return (
    <Space style={{ marginRight: 10 }}>
      {/* <Radio.Group
        value={GlobalRegistry.getDesignerLanguage()}
        optionType="button"
        options={[
          { label: 'English', value: 'en-us' },
          { label: '简体中文', value: 'zh-cn' },
        ]}
        onChange={(e) => {
          GlobalRegistry.setDesignerLanguage(e.target.value)
        }}
      /> */}
      {/* <Button href="https://github.com/alibaba/designable" target="_blank">
        <GithubOutlined />
        Github
      </Button> */}
      <span>{ editKey }</span>
      {
        returnPath ? 
      <Button onClick={() => {
        location.hash = returnPath
      }}>
        <TextWidget>Return</TextWidget>
      </Button> : null
      }
      <Button
        onClick={() => {
          try {
            designer.setCurrentTree(
              transformToTreeNode(currentData?.current)
            )
          } catch {}
        }}
      >
        <TextWidget>Cancel</TextWidget>
      </Button>
      <Button
        onClick={() => {
          const res = saveData(transformToSchema(designer.getCurrentTree()))
          if (res && res.then) {
            res.then(() => {
              message.success('Save Success')
            })
          } else {
            message.success('Save Success')
          }
        }}
      >
        <TextWidget>Save</TextWidget>
      </Button>
      {/* <Button
        type="primary"
        onClick={() => {
          saveSchema(designer)
        }}
      >
        <TextWidget>Publish</TextWidget>
      </Button> */}
    </Space>
  )
})
