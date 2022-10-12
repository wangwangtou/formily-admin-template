import React, { useState } from 'react'
import { FormilyPage } from '@/components'

import { RankCount } from './components/RankCount'
import { StatusTag } from './components/StatusTag'

import page from 'formily/views/table/drag-table'

import { Tag, message, notification, Input } from 'antd'
import { FormConsumer, Field } from '@formily/react'

import { fetchList } from '@/api/article'
import { Field as FCField } from '@formily/core'

export const TableDrag: React.FunctionComponent = () => {
  const [oldList, setOldList] = useState([])
  const {
    schema, components, scope
  } = {
    schema: page,
    components: {
      RankCount,
      StatusTag
    },
    scope: {
      PAGE: {
        useTableData() {
          return async (field: FCField) => {
            const { data } = await fetchList({ page: 1, limit: 10 })
            field.value = data.items

            const oldList = data.items.map(item => item.id).join(',')
            field.form.setValuesIn('oldList', oldList)
            // 会导致一直刷新， 改用 form 内部 Field 实现
            // setOldList(data.items.map(item => item.id))
          }
        }
      }
    },
  }
  return (
    <div className="app-container">
      <FormilyPage schema={schema} components={components} scope={scope} schemaKey="TableDrag" >
        <Field name="oldList" component={[Input, { placeholder: 'Please Input', style: { display: 'none' } }]}></Field>
        <FormConsumer>
          {form => (
            <>
              <div className="show-d">
                <Tag>The default order :</Tag> { form.values.oldList }
              </div>
              <div className="show-d">
                <Tag>The after dragging order :</Tag> { form.values.table.map(item => item.id).join(',') }
              </div>
            </>
          )}
        </FormConsumer>
      </FormilyPage>
    </div>
  )
}