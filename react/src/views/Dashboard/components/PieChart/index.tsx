import React, { useEffect, useRef } from 'react'
import echarts from 'echarts'
import { useResize } from '@/hooks/resize'
import { debounce } from '@/utils'
import { generateChart, ChartProps } from '../chart'
require('echarts/theme/macarons') // echarts theme


const animationDuration = 4000

const setOptions = (chart: React.RefObject<any>, props: ChartProps) => {
  chart.current && chart.current.setOption({
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      left: 'center',
      bottom: '10',
      data: ['Industries', 'Technology', 'Forex', 'Gold', 'Forecasts']
    },
    series: [
      {
        name: 'WEEKLY WRITE ARTICLES',
        type: 'pie',
        roseType: 'radius',
        radius: [15, 95],
        center: ['50%', '38%'],
        data: [
          { value: 320, name: 'Industries' },
          { value: 240, name: 'Technology' },
          { value: 149, name: 'Forex' },
          { value: 100, name: 'Gold' },
          { value: 59, name: 'Forecasts' }
        ],
        animationEasing: 'cubicInOut',
        animationDuration: 2600
      }
    ]
  })
}

export const PieChart = generateChart(setOptions)