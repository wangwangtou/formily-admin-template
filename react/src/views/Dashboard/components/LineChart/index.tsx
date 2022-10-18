import React, { useEffect, useRef } from 'react'
import echarts from 'echarts'
import { useResize } from '@/hooks/resize'
import { debounce } from '@/utils'
import { generateChart, ChartProps } from '../chart'
require('echarts/theme/macarons') // echarts theme

interface LineChartProps {
  chartData: {
    expectedData: any[],
    actualData: any[]
  }
}

const setOptions = (chart: React.RefObject<any>, { chartData = { expectedData: [], actualData: [] } }: LineChartProps & ChartProps) => {
  chart.current && chart.current.setOption({
    xAxis: {
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      boundaryGap: false,
      axisTick: {
        show: false
      }
    },
    grid: {
      left: 10,
      right: 10,
      bottom: 20,
      top: 30,
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      },
      padding: [5, 10]
    },
    yAxis: {
      axisTick: {
        show: false
      }
    },
    legend: {
      data: ['expected', 'actual']
    },
    series: [{
      name: 'expected', itemStyle: {
        normal: {
          color: '#FF005A',
          lineStyle: {
            color: '#FF005A',
            width: 2
          }
        }
      },
      smooth: true,
      type: 'line',
      data: chartData.expectedData,
      animationDuration: 2800,
      animationEasing: 'cubicInOut'
    },
    {
      name: 'actual',
      smooth: true,
      type: 'line',
      itemStyle: {
        normal: {
          color: '#3888fa',
          lineStyle: {
            color: '#3888fa',
            width: 2
          },
          areaStyle: {
            color: '#f3f8ff'
          }
        }
      },
      data: chartData.actualData,
      animationDuration: 2800,
      animationEasing: 'quadraticOut'
    }]
  })
}

const effects = (chart: React.RefObject<any>, { chartData }: LineChartProps & ChartProps) => {
  useEffect(() => {
    setOptions(chart, { chartData })
  }, [chartData])
}

export const LineChart = generateChart(setOptions, effects)