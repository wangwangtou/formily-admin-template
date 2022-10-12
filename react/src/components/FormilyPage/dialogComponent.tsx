import React from 'react'
import { DesignablePage, SchemaField } from './index'
import { FormLayout, FormDialogRenderer } from '@formily/antd'
import * as AdminTemplateScope from './adminTemplateScope'
import { Form } from '@formily/core'

interface DialogComponentProps {
  form: Form
}

interface DialogComponentOption {
  footer?: () => React.ReactNode,
  components?: any,
  scope?: any
}

export const getFormDialogComponent = (page: DesignablePage, opt: DialogComponentOption) : (form: Form) => React.ReactElement => {
  opt = opt || { }
  const DialogComponent: React.FunctionComponent<DialogComponentProps> = (props) => {
    return (
      <FormLayout {...page.form}>
        <SchemaField 
          schema={page.schema}
          components={opt.components}
          scope={{
            ...AdminTemplateScope,
            ...opt.scope
          }} />
        { opt.footer ? opt.footer() : null }
      </FormLayout>
    )
  }
  return (form) => (
    <DialogComponent form={form}/>
  )
}
