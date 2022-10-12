import React, { useEffect, useState } from 'react'
import { FormilyPage } from '@/components'

import { RankCount } from './components/RankCount'
import { StatusTag } from './components/StatusTag'

import page from 'formily/views/table/inline-edit-table'

import { fetchList } from '@/api/article'

import { mapReadPretty, useField, connect } from '@formily/react'
import { observable, raw } from '@formily/reactive'
import { observer } from '@formily/reactive-react'
import { Button } from '@/components/FormilyPage/projectComponents'
import { ButtonProps, message } from 'antd'
import { PreviewText, Input } from '@formily/antd'
import { Field } from '@formily/core'
interface EditButtonProps {
  fields: string[],
  ok?: React.ReactNode, 
  edit?: React.ReactNode, 
}

const EditButton = observer<EditButtonProps & ButtonProps>((props) => {
    const fieldRef = useField()
    const editRef = observable.computed(() => {
      let val = false
      props.fields.forEach(field => {
        const editField = fieldRef.query('.' + field).take()
        val = val || editField.selfPattern === 'editable'
      })
      return val
    })
    const edit = () => {
      props.fields.forEach(field => {
        const editField = fieldRef.query('.' + field).take()
        editField.setPattern('editable')
      })
    }
    const ok = () => {
      props.fields.forEach(field => {
        const editField = fieldRef.query('.' + field).take()
        editField.setPattern('readPretty')
      })
    }
    const attrs = !editRef.value ? {
      type: 'primary',
      size: 'small',
      icon: 'el-icon-edit'
    } : {
      type: 'success',
      size: 'small',
      icon: 'el-icon-circle-check-outline'
    }
    const click = editRef.value ? ok : edit
    return (
      <Button {...props}  {...attrs} onClick={click}>{
        editRef.value ? (props.ok || 'Ok') : (props.edit || 'Edit')
      }</Button>
    )
  }
)

const wrapWithCancel : (component: React.FunctionComponent) => React.FunctionComponent = component => {
  const InputWithCancel = (props) => {
    const fieldRef = useField<Field>()
    const [oldValue, setOldValue] = useState(fieldRef.value)
    useEffect(() => {
      if (fieldRef.selfPattern == 'editable') {
        setOldValue(fieldRef.value)
      }
    }, [fieldRef.selfPattern])
    const cancel = () => {
      fieldRef.setValue(oldValue)
      fieldRef.setPattern('readPretty')
      message.warning('The title has been restored to the original value')
    }
    return (
      <>
        { React.createElement(component, {
          ...props,
          style: { width: 'calc(100% - 100px)' }
        }) }
        <Button
          className='cancel-btn'
          size='small'
          icon='el-icon-refresh'
          type='warning'
          onClick={cancel}
          style={{
            position: 'absolute',
            right: '15px',
            top: '10px'
          }}
        >{props.cancel || 'cancel'}</Button>
      </>
    )
  }
  return InputWithCancel
}

export const TableInlineEdit: React.FunctionComponent = () => {
  const {
    schema, components, scope
  } = {
    schema: page,
    components: {
      RankCount,
      StatusTag,
      PAGE: {
        EditButton,
        InputWithCancel: connect(wrapWithCancel(Input), mapReadPretty(PreviewText.Input))
      }
    },
    scope: {
      PAGE: {
        useTableData() {
          return async field => {
            const { data } = await fetchList({ page: 1, limit: 10 })
            field.value = data.items
          }
        }
      }
    }
  }
  return (
    <div className="app-container">
      <FormilyPage schema={schema} components={components} scope={scope} schemaKey="TableInlineEdit" />
    </div>
  )
}