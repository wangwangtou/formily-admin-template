import React from 'react'
import { FormilyPage } from '@/components'

import page from 'formily/views/table/dynamic-table'

export const TableDynamic: React.FunctionComponent = () => {
  const { schema, components, scope } = {
    schema: page,
    components: {
      Container: 'div'
    },
    scope: {
      PAGE: {
        useColumnVisible(optionPath) {
          return field => {
            const opts = field.query(optionPath).value()
            field.visible = opts.includes(field.props.name)
          }
        },
        useColumnVisibleSort(optionPath) {
          return field => {
            const opts = field.query(optionPath).value()
            const idx = opts.indexOf(field.props.name)
            if (idx >= 0) {
              field.setComponentProps({
                index: idx + 1
              })
              field.visible = true
            } else {
              field.visible = false
            }
          }
        },
        useTableData() {
          return field => {
            field.value = [
              {
                name: 'fruit-1',
                apple: 'apple-10',
                banana: 'banana-10',
                orange: 'orange-10'
              },
              {
                name: 'fruit-2',
                apple: 'apple-20',
                banana: 'banana-20',
                orange: 'orange-20'
              }
            ]
          }
        }
      }
    }
  }
  return (
    <div className="app-container">
      <FormilyPage schema={schema} components={components} scope={scope} schemaKey="TableDynamic" />
    </div>
  )
}