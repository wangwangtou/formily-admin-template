import React from 'react'
export const PanelGroup: React.FC = (props: any) => {
  return (
    <div
      class="panel-group"
      {...props}
      // data-designer-node-id={props.className.match(/data-id\:([^\s]+)/)?.[1]}
    >
      <span>FormilyPanel</span>
    </div>
  )
}
