import React, { useState, } from 'react'

import { createForm, Form } from '@formily/core'
import { FormProvider, FormConsumer, createSchemaField, JSXComponent } from '@formily/react'

import * as FormilyAntd from '@formily/antd'
import * as ProjectComponents from './projectComponents'
import {  } from './transformComponent'
import * as AdminTemplateScope from './adminTemplateScope'

import { ISchema } from '@formily/json-schema'
import { NavLink } from 'react-router-dom'

export interface DesignablePage {
    form: {
        labelCol: Number,
        wrapperCol: Number
    },
    schema: ISchema
}

interface FormilyPageProps {
  schema: DesignablePage,
  schemaKey?: string,
  components?: {
    [key: string]: JSXComponent
  },
  scope?: Object,
  effects?: (form: Form) => void
}

const SchemaField = createSchemaField({
  components: {
    ...FormilyAntd,
    // Input: Object.assign(
    //   transformNativeOn(FormilyAntd.Input),
    //   {
    //     TextArea: transformNativeOn(FormilyAntd.Input.TextArea)
    //   }
    // ),
    // Password: transformNativeOn(FormilyAntd.Password),
    // Radio: FormilyAntd.Radio,
    ...ProjectComponents
  }
})

export const FormilyPage: React.FunctionComponent<FormilyPageProps> = ({ schema, schemaKey, components, effects, scope }) => {
  const form = createForm({
    effects
  })
  const scopeWithAT = {
    ...AdminTemplateScope,
    ...scope,
  }
  return (
    <FormProvider form={form}>
      <slot name="before" />
      <SchemaField schema={schema.schema} components={components} scope={scopeWithAT} />
      <slot name="default" />
      <FormConsumer>
        {form => (
          schemaKey ? <NavLink to={'/designable?key=' + schemaKey}>编辑</NavLink> : null
        )}
      </FormConsumer>
    </FormProvider>
  )
}