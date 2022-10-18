import React from 'react'

import {
  GithubCorner,
  FormilyPage,
} from '@/components'
import { wrapComponent } from '@/components/FormilyPage/transformComponent'
import {
  PanelGroup,
  LineChart,
  RaddarChart,
  PieChart,
  BarChart,
  TransactionTable,
  TodoList,
  BoxCard,
} from './components'
import { Store } from 'formily/views'

import './style.less'

export const Dashboard: React.FunctionComponent = () => {

  const { schema, components, scope } = {
    schema: Store.Dashboard,
    components: {
      PanelGroup,
      LineChart,
      RaddarChart: wrapComponent(RaddarChart, 'div', { class: 'chart-wrapper' }),
      PieChart: wrapComponent(PieChart, 'div', { class: 'chart-wrapper' }),
      BarChart: wrapComponent(BarChart, 'div', { class: 'chart-wrapper' }),
      TransactionTable,
      TodoList,
      BoxCard
    },
    scope: {
      PAGE: {
        useQueryChartData() {
          return function(field) {
            const dataSource = [
              {
                title: 'New Visits',
                value: 102400,
                icon: 'peoples',
                lineData: {
                  expectedData: [100, 120, 161, 134, 105, 160, 165],
                  actualData: [120, 82, 91, 154, 162, 140, 145]
                }
              },
              {
                title: 'Messages',
                value: 81212,
                icon: 'message',
                lineData: {
                  expectedData: [200, 192, 120, 144, 160, 130, 140],
                  actualData: [180, 160, 151, 106, 145, 150, 130]
                }
              },
              {
                title: 'Purchases',
                value: 9280,
                icon: 'money',
                lineData: {
                  expectedData: [80, 100, 121, 104, 105, 90, 100],
                  actualData: [120, 90, 100, 138, 142, 130, 130]
                }
              },
              {
                title: 'Shoppings',
                value: 13600,
                icon: 'shopping',
                lineData: {
                  expectedData: [130, 140, 141, 142, 145, 150, 160],
                  actualData: [120, 82, 91, 154, 162, 140, 130]
                }
              }
            ]
            field.setComponentProps({
              dataSource,
              onHandleSetLineChartData: function({ lineData }) {
                field.query('row1.lineChart').take(chartField => {
                  chartField.setComponentProps({
                    chartData: lineData
                  })
                })
              }
            })
            field.query('row1.lineChart').take(chartField => {
              chartField.setComponentProps({
                chartData: dataSource[0] ? dataSource[0].lineData : { expectedData: [], actualData: [] }
              })
            })
          }
        }
      }
    }
  }
  return (
    <div className="dashboard-container">
      <div className="dashboard-editor-container">
        <GithubCorner className="github-corner" />
        <FormilyPage schema={schema} components={components} scope={scope} schemaKey="Dashboard" />
      </div>
    </div>
  )
}