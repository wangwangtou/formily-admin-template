
import React, { } from 'react'
import ReactDOM from 'react-dom'
import Provider from './designable/main'

const Editor = Provider

export {
  React,
  ReactDOM,
  Editor
}
// const editData = JSON.parse('{"form":{"labelCol":6,"wrapperCol":12},"schema":{"type":"object","properties":{"panelGroup":{"type":"void","x-component":"PanelGroup","x-component-props":{"dataSource":[]},"x-reactions":["{{ PAGE.useQueryChartData() }}"],"x-designable-id":"jhq46xcypq0","x-index":0},"lineChart":{"type":"void","x-decorator":"Row","x-component":"LineChart","x-component-props":{"chart-data":{"expectedData":[],"actualData":[]}},"x-decorator-props":{"style":{"background":"#fff","padding":"16px 16px 0","marginBottom":"32px"}},"x-designable-id":"jhq46xcypqo","x-index":1},"row2":{"type":"void","x-component":"Row","x-component-props":{"gutter":32},"properties":{"raddarChart":{"type":"void","x-decorator":"Col","x-component":"RaddarChart","x-component-props":{},"x-decorator-props":{"xs":24,"sm":24,"lg":8},"x-designable-id":"zrddcpko5dk1","x-index":1},"pieChart":{"type":"void","x-decorator":"Col","x-component":"PieChart","x-component-props":{},"x-decorator-props":{"xs":24,"sm":24,"lg":8},"x-designable-id":"zrddcpko5dk2","x-index":2},"barChart":{"type":"void","x-decorator":"Col","x-component":"BarChart","x-component-props":{},"x-decorator-props":{"xs":24,"sm":24,"lg":8},"x-designable-id":"zrddcpko5dk3","x-index":3}},"x-designable-id":"zrddcpko5dk4","x-index":2},"row3":{"type":"void","x-component":"Row","x-component-props":{"gutter":8},"properties":{"transactionTable":{"type":"void","x-decorator":"Col","x-component":"TransactionTable","x-component-props":{},"x-decorator-props":{"xs":24,"sm":24,"md":24,"lg":12,"xl":12,"style":{"paddingRight":"8px","marginBottom":"30px"}},"x-designable-id":"zrddcpko5dk5","x-index":1},"todoList":{"type":"void","x-decorator":"Col","x-component":"TodoList","x-component-props":{},"x-decorator-props":{"xs":24,"sm":24,"md":12,"lg":6,"xl":6,"style":{"marginBottom":"30px"}},"x-designable-id":"zrddcpko5dk6","x-index":2},"boxCard":{"type":"void","x-decorator":"Col","x-component":"BoxCard","x-component-props":{},"x-decorator-props":{"xs":24,"sm":24,"md":12,"lg":6,"xl":6,"style":{"marginBottom":"30px"}},"x-designable-id":"zrddcpko5dk7","x-index":3}},"x-designable-id":"zrddcpko5dk8","x-index":3}},"x-designable-id":"6t65zequ0jp"}}')

// ReactDOM.render(<Provider editData={editData}
//   onSaveData={(data) => {
//     debugger
//     console.log(data)
//   }}>
//   </Provider>, document.getElementById('app'))

