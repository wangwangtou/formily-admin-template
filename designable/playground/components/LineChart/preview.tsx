import React from 'react'
import { createBehavior, createResource } from '@designable/core'
import { DnFC } from '@designable/react'
import { createFieldSchema } from '../../../src/components/Field'

import { LineChart as FormilyLineChart } from '../../formily'
import { LineChartSource, getIcon } from '../../icons'

export const LineChart: DnFC<React.ComponentProps<typeof FormilyLineChart>> =
  FormilyLineChart

const LineChartSchema = {
  type: 'object',
  properties: {
    'chart-data': {
      type: 'object',
      title: '图表数据'
    }
  }
}

const LineChartLocale = {
  'zh-CN': {
    title: 'Dashboard 线形图表',
    settings: {
      'x-component-props': {
      }
    }
  },
  'en-US': {
    title: 'Dashboard Line Chart',
    settings: {
      'x-component-props': {
      }
    }
  }
}

LineChart.Behavior = createBehavior(
  {
    name: 'LineChart',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'LineChart',
    designerProps: {
      propsSchema: createFieldSchema(LineChartSchema)
    },
    designerLocales: LineChartLocale
  }
)

LineChart.Resource = createResource(
  {
    icon: getIcon(LineChartSource),
    elements: [
      {
        componentName: 'Field',
        props: {
          type: 'void',
          'x-component': 'LineChart'
        }
      }
    ]
  }
)
