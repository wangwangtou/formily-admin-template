import React from 'react'
import { FormilyPage } from '@/components'
import { getFormDialogComponent } from '@/components/FormilyPage/dialogComponent'

import { RankCount } from './components/RankCount'
import { StatusTag } from './components/StatusTag'

import { untracked, raw } from '@formily/reactive'
import { FormDialog } from '@formily/antd'

import page, { add, edit } from 'formily/views/table/complex-table'

import { Tag, message, notification } from 'antd'

import { fetchList, createArticle } from '@/api/article'

export const TableComplex: React.FunctionComponent = () => {
  const { schema, components, scope } = {
    schema: page,
    components: {
      RankCount,
      StatusTag,
      Container: 'div',
      LinkCell: 'span',
      Tag
    },
    scope: {
      PAGE: {
        /**
         * @param {Object} filter
         * @param {import('@formily/core').Form} form
         */
        fetchList(filter, form) {
          const table = form.query('.table').take()
          form.query('.pagination').take(async pagination => {
            const { size, current } = pagination.value
            const { data } = await fetchList({ limit: size, page: current, ...filter })
            table.value = data.items
            pagination.setComponentProps({
              total: data.total
            })
            pagination.hidden = data.total <= 0
          })
        },
        onSearch(form, fetchList) {
          return function() {
            const { reviewer, ...filter } = form.query('.filter').value()
            fetchList(filter, form)
          }
        },
        useTablePaginationData(form, fetchList) {
          // 不与filter字段做依赖
          const { reviewer, ...filter } = untracked(() => raw(form.query('.filter').value()))
          return field => {
            fetchList(filter, field.form)
          }
        },
        onOpenAddFormDialog: form => {
          const opt = { scope: scope, components: components }
          return function onOpenAddFormDialog() {
            FormDialog('Add', getFormDialogComponent(add, opt))
              .forOpen((payload, next) => {
                next({
                  initialValues: {
                    importance: 1,
                    status: 'published',
                    timestamp: new Date()
                  }
                })
              })
              .forConfirm(async(payload, next) => {
                await createArticle({
                  ...payload.values,
                  id: parseInt((Math.random() * 100).toString()) + 1024,
                  author: 'formily-element-admin'
                })
                next()
              })
              .forCancel((payload, next) => {
                next()
              })
              .open()
              .then(() => {
                notification.success({
                  // title: 'Success',
                  message: 'Created Successfully',
                  type: 'success',
                  duration: 2000/1000
                })
              })
              .catch(message.warning)
          }
        },
        /**
         * @param {import('@formily/core').Field} field
         */
        onOpenEditFormDialog: field => {
          const opt = { scope: scope, components: components }
          return function onOpenEditFormDialog() {
            const row = field.query('..').value()[field.index]
            FormDialog('Edit', getFormDialogComponent(edit, opt))
              .forOpen((payload, next) => {
                next({
                  initialValues: {
                    ...row,
                    timestamp: new Date(row.timestamp)
                  }
                })
              })
              .forConfirm(async(payload, next) => {
                await createArticle({
                  ...payload.values,
                  id: parseInt((Math.random() * 100).toString()) + 1024,
                  author: 'formily-element-admin'
                })
                next()
              })
              .forCancel((payload, next) => {
                next()
              })
              .open()
              .then(() => {
                notification.success({
                  // title: 'Success',
                  message: 'Update Successfully',
                  type: 'success',
                  duration: 2000/1000
                })
              })
              .catch(message.warning)
          }
        },
        /**
         * @param {import('@formily/core').Field} field
         */
        onPublishClick(field) {
          return function onPublishClick() {
            message.success('操作Success')
            field.query('.status').take(f => f.setValue('published'))
          }
        },
        /**
         * @param {import('@formily/core').Field} field
         */
        onDraftClick(field) {
          return function onDraftClick() {
            message.success('操作Success')
            field.query('.status').take(f => f.setValue('draft'))
          }
        },
        /**
         * @param {import('@formily/core').Field} field
         */
        onDeleteClick(field) {
          return function onDeleteClick() {
            notification.success({
              // title: 'Success',
              message: 'Delete Successfully',
              type: 'success',
              duration: 2000/1000
            })
            const table = field.query('..').take()
            table.remove(field.index)
          }
        }
      }
    }
  }
  return (
    <div className="app-container">
      <FormilyPage schema={schema} components={components} scope={scope} schemaKey="TableComplex" />
    </div>
  )
}