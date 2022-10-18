import React, { useState, } from 'react'

import { createForm, Form } from '@formily/core'
import { FormProvider, FormConsumer, createSchemaField, JSXComponent } from '@formily/react'

import * as FormilyAntd from '@formily/antd'
import * as ProjectComponents from './projectComponents'
import {  } from './transformComponent'
import * as AdminTemplateScope from './adminTemplateScope'

import { ISchema } from '@formily/json-schema'
import { NavLink, useLocation } from 'react-router-dom'

import settings from '@/settings'

export interface DesignablePage {
    form: {
        labelCol: number,
        wrapperCol: number
    },
    schema: ISchema
}

type FormilyComponent = JSXComponent | string

interface FormilyComponents {
  [key: string]: FormilyComponent | FormilyComponents
}
interface FormilyPageProps {
  schema: DesignablePage,
  schemaKey?: string,
  components?: FormilyComponents,
  before?: React.ReactNode,
  after?: React.ReactNode,
  scope?: Object,
  effects?: (form: Form) => void
}

export const SchemaField = createSchemaField({
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

export const FormilyPage: React.FunctionComponent<FormilyPageProps> = ({ schema, schemaKey, components, effects, scope, before, after, children }) => {
  const form = createForm({
    effects
  })
  const scopeWithAT = {
    ...AdminTemplateScope,
    ...scope,
  }
  const location = useLocation()
  const returnPath = location.pathname + location.search
  return (
    <FormProvider form={form}>
      {before}
      <SchemaField schema={schema.schema} components={components} scope={scopeWithAT} />
      {children}
      <FormConsumer>
        {form => (
          settings.showSchemaEditBtn && schemaKey ? <NavLink to={'/designable?key=' + schemaKey + '&returnPath=' + encodeURIComponent(returnPath)}>编辑</NavLink> : null
        )}
      </FormConsumer>
      {after}
    </FormProvider>
  )
}