import 'antd/dist/antd.less'
import React, { useMemo } from 'react'
import ReactDOM from 'react-dom'
import {
  Designer,
  DesignerToolsWidget,
  ViewToolsWidget,
  Workspace,
  OutlineTreeWidget,
  ResourceWidget,
  HistoryWidget,
  StudioPanel,
  CompositePanel,
  WorkspacePanel,
  ToolbarPanel,
  ViewportPanel,
  ViewPanel,
  SettingsPanel,
  ComponentTreeWidget,
} from '@designable/react'
import {
  SettingsForm,
  setNpmCDNRegistry,
} from '@designable/react-settings-form'
import {
  createDesigner,
  GlobalRegistry,
  Shortcut,
  KeyCode,
} from '@designable/core'
import {
  LogoWidget,
  ActionsWidget,
  PreviewWidget,
  SchemaEditorWidget,
  MarkupSchemaWidget,
} from './widgets'
import { saveSchema } from './service'
import {
  Form,
  Field,
  Input,
  Select,
  TreeSelect,
  Cascader,
  Radio,
  Checkbox,
  Slider,
  Rate,
  NumberPicker,
  Transfer,
  Password,
  DatePicker,
  TimePicker,
  Upload,
  Switch,
  Text,
  Card,
  ArrayCards,
  ObjectContainer,
  ArrayTable,
  Space,
  FormTab,
  FormCollapse,
  FormLayout,
  FormGrid,
} from '../src'

import {
  PanelGroup,
  LineChart,
  Row,
  Col,
} from './components'
import * as PlaygroundComponents from './components'

setNpmCDNRegistry('//unpkg.com')

GlobalRegistry.registerDesignerLocales({
  'zh-CN': {
    sources: {
      Inputs: '输入控件',
      Layouts: '布局组件',
      Arrays: '自增组件',
      Displays: '展示组件',
      Project: '项目组件',
    },
  },
  'en-US': {
    sources: {
      Inputs: 'Inputs',
      Layouts: 'Layouts',
      Arrays: 'Arrays',
      Displays: 'Displays',
      Project: 'Project',
    },
  }
})

const App = () => {
  const engine = useMemo(
    () =>
      createDesigner({
        shortcuts: [
          new Shortcut({
            codes: [
              [KeyCode.Meta, KeyCode.S],
              [KeyCode.Control, KeyCode.S],
            ],
            handler(ctx) {
              saveSchema(ctx.engine)
            },
          }),
        ],
        rootComponentName: 'Form',
      }),
    []
  )
  return (
    <Designer engine={engine}>
      <StudioPanel logo={<LogoWidget />} actions={<ActionsWidget />}>
        <CompositePanel>
          <CompositePanel.Item title="panels.Component" icon="Component">
            <ResourceWidget
              title="sources.Inputs"
              sources={[
                Input,
                Password,
                NumberPicker,
                Rate,
                Slider,
                Select,
                TreeSelect,
                Cascader,
                Transfer,
                Checkbox,
                Radio,
                DatePicker,
                TimePicker,
                Upload,
                Switch,
                ObjectContainer,
              ]}
            />
            <ResourceWidget
              title="sources.Layouts"
              sources={[
                Card,
                FormGrid,
                FormTab,
                FormLayout,
                FormCollapse,
                Space,

                Row,
                Col,
              ]}
            />
            <ResourceWidget
              title="sources.Arrays"
              sources={[ArrayCards, ArrayTable]}
            />
            <ResourceWidget title="sources.Displays" sources={[Text]} />
            <ResourceWidget
              title="sources.Project"
              sources={[PanelGroup, LineChart]}
            />
          </CompositePanel.Item>
          <CompositePanel.Item title="panels.OutlinedTree" icon="Outline">
            <OutlineTreeWidget />
          </CompositePanel.Item>
          <CompositePanel.Item title="panels.History" icon="History">
            <HistoryWidget />
          </CompositePanel.Item>
        </CompositePanel>
        <Workspace id="form">
          <WorkspacePanel>
            <ToolbarPanel>
              <DesignerToolsWidget />
              <ViewToolsWidget
                use={['DESIGNABLE', 'JSONTREE', 'MARKUP', 'PREVIEW']}
              />
            </ToolbarPanel>
            <ViewportPanel style={{ height: '100%' }}>
              <ViewPanel type="DESIGNABLE">
                {() => (
                  <ComponentTreeWidget
                    components={{
                      Form,
                      Field,
                      Input,
                      Select,
                      TreeSelect,
                      Cascader,
                      Radio,
                      Checkbox,
                      Slider,
                      Rate,
                      NumberPicker,
                      Transfer,
                      Password,
                      DatePicker,
                      TimePicker,
                      Upload,
                      Switch,
                      Text,
                      Card,
                      ArrayCards,
                      ArrayTable,
                      Space,
                      FormTab,
                      FormCollapse,
                      FormGrid,
                      FormLayout,
                      ObjectContainer,

                      ...PlaygroundComponents,
                    }}
                  />
                )}
              </ViewPanel>
              <ViewPanel type="JSONTREE" scrollable={false}>
                {(tree, onChange) => (
                  <SchemaEditorWidget tree={tree} onChange={onChange} />
                )}
              </ViewPanel>
              <ViewPanel type="MARKUP" scrollable={false}>
                {(tree) => <MarkupSchemaWidget tree={tree} />}
              </ViewPanel>
              <ViewPanel type="PREVIEW">
                {(tree) => <PreviewWidget tree={tree} />}
              </ViewPanel>
            </ViewportPanel>
          </WorkspacePanel>
        </Workspace>
        <SettingsPanel title="panels.PropertySettings">
          <SettingsForm uploadAction="https://www.mocky.io/v2/5cc8019d300000980a055e76" />
        </SettingsPanel>
      </StudioPanel>
    </Designer>
  )
}

export default class Designable {
  dom: HTMLElement
  render(dom) {
    this.dom = typeof dom === 'string' ? document.getElementById(dom) : dom
    ReactDOM.render(<App />, this.dom)
  }
  unmount() {
    ReactDOM.unmountComponentAtNode(this.dom)
  }
}

localStorage.setItem('formily-schema', '{"form":{"labelCol":6,"wrapperCol":12},"schema":{"type":"object","properties":{"panelGroup":{"type":"void","x-component":"PanelGroup","x-component-props":{"dataSource":[]},"x-reactions":["{{ PAGE.useQueryChartData() }}"],"x-designable-id":"jhq46xcypq0","x-index":0},"lineChart":{"type":"void","x-decorator":"Row","x-component":"LineChart","x-component-props":{"chart-data":{"expectedData":[],"actualData":[]}},"x-decorator-props":{"style":{"background":"#fff","padding":"16px 16px 0","marginBottom":"32px"}},"x-designable-id":"jhq46xcypqo","x-index":1},"row2":{"type":"void","x-component":"Row","x-component-props":{"gutter":32},"properties":{"raddarChart":{"type":"void","x-decorator":"Col","x-component":"RaddarChart","x-component-props":{},"x-decorator-props":{"xs":24,"sm":24,"lg":8},"x-designable-id":"zrddcpko5dk1","x-index":1},"pieChart":{"type":"void","x-decorator":"Col","x-component":"PieChart","x-component-props":{},"x-decorator-props":{"xs":24,"sm":24,"lg":8},"x-designable-id":"zrddcpko5dk2","x-index":2},"barChart":{"type":"void","x-decorator":"Col","x-component":"BarChart","x-component-props":{},"x-decorator-props":{"xs":24,"sm":24,"lg":8},"x-designable-id":"zrddcpko5dk3","x-index":3}},"x-designable-id":"zrddcpko5dk4","x-index":2},"row3":{"type":"void","x-component":"Row","x-component-props":{"gutter":8},"properties":{"transactionTable":{"type":"void","x-decorator":"Col","x-component":"TransactionTable","x-component-props":{},"x-decorator-props":{"xs":24,"sm":24,"md":24,"lg":12,"xl":12,"style":{"paddingRight":"8px","marginBottom":"30px"}},"x-designable-id":"zrddcpko5dk5","x-index":1},"todoList":{"type":"void","x-decorator":"Col","x-component":"TodoList","x-component-props":{},"x-decorator-props":{"xs":24,"sm":24,"md":12,"lg":6,"xl":6,"style":{"marginBottom":"30px"}},"x-designable-id":"zrddcpko5dk6","x-index":2},"boxCard":{"type":"void","x-decorator":"Col","x-component":"BoxCard","x-component-props":{},"x-decorator-props":{"xs":24,"sm":24,"md":12,"lg":6,"xl":6,"style":{"marginBottom":"30px"}},"x-designable-id":"zrddcpko5dk7","x-index":3}},"x-designable-id":"zrddcpko5dk8","x-index":3}},"x-designable-id":"6t65zequ0jp"}}')
new Designable().render('root')
