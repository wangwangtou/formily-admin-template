import React from 'react'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@designable/react'
import { createFieldSchema, createVoidFieldSchema } from '@designable/formily-antd/esm/components/Field'

import { ChartSource, TableSource, getIcon } from '../../icons'

import {
  LineChart as FLineChart,
  BarChart as FBarChart,
  PieChart as FPieChart,
  RaddarChart as FRaddarChart,

  TransactionTable as FTransactionTable,
  TodoList as FTodoList,
  BoxCard as FBoxCard,
} from '../../formily'

export const getChartComponents = (
  name,
  ChartComponent,
  title = {
    zh: 'Dashboard 图表',
    en: 'Dashboard Chart',
  },
  ChartSchema = { type: 'void', properties: {} },
  Icon: React.ReactNode | string = ChartSource
  ) => {
  const Chart: DnFC<React.ComponentProps<typeof ChartComponent>> = ChartComponent

  const ChartLocale = {
    'zh-CN': {
      title: title.zh,
      settings: {
        'x-component-props': {
        }
      }
    },
    'en-US': {
      title: title.en,
      settings: {
        'x-component-props': {
        }
      }
    }
  }
  Chart.Behavior = createBehavior(
    {
      name: name,
      extends: ['Field'],
      selector: (node) => node.props['x-component'] === name,
      designerProps: {
        propsSchema: createVoidFieldSchema(ChartSchema)
      },
      designerLocales: ChartLocale
    }
  )
  
  Chart.Resource = createResource(
    {
      icon: getIcon(Icon),
      elements: [
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': name
          }
        }
      ]
    }
  )
  return Chart
}

export const LineChart = getChartComponents('LineChart', FLineChart, {
  zh: 'DashBoard 线状图表',
  en: 'DashBoard Line Chart',
}, {
  type: 'void',
  properties: {
    'chart-data': {
      type: 'object',
      title: '图表数据'
    }
  }
})

export const BarChart = getChartComponents('BarChart', FBarChart, {
  zh: 'DashBoard 柱状图表',
  en: 'DashBoard Bar Chart',
})

export const PieChart = getChartComponents('PieChart', FPieChart, {
  zh: 'DashBoard 饼状图表',
  en: 'DashBoard Pie Chart',
})

export const RaddarChart = getChartComponents('RaddarChart', FRaddarChart, {
  zh: 'DashBoard 雷达图表',
  en: 'DashBoard Raddar Chart',
})

export const TransactionTable = getChartComponents('TransactionTable', FTransactionTable, {
  zh: 'DashBoard Transaction Table',
  en: 'DashBoard Transaction Table',
}, null, TableSource)

export const BoxCard = getChartComponents('BoxCard', FBoxCard, {
  zh: 'DashBoard Box Card',
  en: 'DashBoard Box Card',
}, null, 'LangRank')

export const TodoList = getChartComponents('TodoList', FTodoList, {
  zh: 'DashBoard Todo List',
  en: 'DashBoard Todo List',
}, null, 'Todo')