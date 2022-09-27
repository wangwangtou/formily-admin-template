import React from 'react'
export const LineChart: React.FC = (props: any) => {
  return (
    <div
      class="line-chart"
      {...props}
      // data-designer-node-id={props.className.match(/data-id\:([^\s]+)/)?.[1]}
    >
      <span>FormilyLineChart</span>
    </div>
  )
}
