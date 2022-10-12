import React, { useEffect, useRef } from 'react'
import echarts from 'echarts'
import { useResize } from '@/hooks/resize'
import { debounce } from '@/utils'
require('echarts/theme/macarons') // echarts theme

export interface ChartProps {
  className?: string,
  height?: string,
  width?: string
}

export function generateChart<T>(setOptionFn: (chart: React.RefObject<any>, props: T & ChartProps) => void
  , effects?: (chart: React.RefObject<any>, props: T & ChartProps) => void): React.FunctionComponent<T & ChartProps> {
  return (props) => {
    const chart = useRef(null)
    const divRef = useRef(null)
    const setOptions = () => {
      chart.current && setOptionFn(chart, props)
    }

    useEffect(() => {
      chart.current = echarts.init(divRef.current, 'macarons')
      setOptions()
      return () => {
        chart.current.dispose()
      }
    }, [])

    useResize(debounce(() => chart.current && chart.current.resize(), 100))
    
    effects && effects(chart, props)
    
    return (
      <div ref={divRef}
        className={props.className} style={{height:props.height || '350px',width:props.width || '100%'}} />
    )
  }
}