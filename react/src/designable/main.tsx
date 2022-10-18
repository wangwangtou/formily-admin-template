import 'antd/dist/antd.less'
import React, { useMemo, useRef } from 'react'
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
} from './widgets'
// import { saveSchema } from './service'

import {
  SourcesInputs,
  SourcesArrays,
  SourcesLayouts,
  SourcesDisplays,
  SourcesProject,
  DesignableAll,

  Setters,
} from './dn'

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
            //   saveSchema(ctx.engine)
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
              sources={SourcesInputs}
            />
            <ResourceWidget
              title="sources.Layouts"
              sources={SourcesLayouts}
            />
            <ResourceWidget
              title="sources.Arrays"
              sources={SourcesArrays}
            />
            <ResourceWidget title="sources.Displays" sources={SourcesDisplays} />
            {/* <ResourceWidget
              title="sources.Project"
              sources={SourcesProject}
            /> */}
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
                use={['DESIGNABLE', 'JSONTREE', 'PREVIEW']}
              />
            </ToolbarPanel>
            <ViewportPanel style={{ height: '100%' }}>
              <ViewPanel type="DESIGNABLE">
                {() => (
                  <ComponentTreeWidget
                    components={DesignableAll}
                  />
                )}
              </ViewPanel>
              <ViewPanel type="JSONTREE" scrollable={false}>
                {(tree, onChange) => (
                  <SchemaEditorWidget tree={tree} onChange={onChange} />
                )}
              </ViewPanel>
              <ViewPanel type="PREVIEW">
                {(tree) => <PreviewWidget tree={tree} />}
              </ViewPanel>
            </ViewportPanel>
          </WorkspacePanel>
        </Workspace>
        <SettingsPanel title="panels.PropertySettings">
          <SettingsForm uploadAction="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            components={Setters}
            scope={{}}/>
        </SettingsPanel>
      </StudioPanel>
    </Designer>
  )
}

import '@/icons' // icon
import '@formily/antd/dist/antd.css';
import '@/utils/schemaPatches'
import '@/styles/index.less' // global css

import {
  createSettingState,
  createPermissionState,
  createUserState,

  GlobalContext
} from '@/hooks'

import {
  DesignableContext
} from './context'


interface IEditorProps {
  editData: Object,
  editKey: string,
  returnPath: string,
  onSaveData?: (data: Object) => Promise<void> | void
}

const Provider: React.FC<IEditorProps> = ({ children, editData, onSaveData, returnPath, editKey }) => {
  const settingState = createSettingState()
  const permissionState = createPermissionState()
  const userState = createUserState()
  const dataRef = useRef(editData)
  return (
    <GlobalContext.Provider value={{...settingState,...permissionState,...userState}}>
      <DesignableContext.Provider value={{
        saveData: data => {
          dataRef.current = data
          return onSaveData?.(data)
        },
        currentData: dataRef,
        editKey,
        returnPath,
        getData: () => {
          return dataRef.current
        }
      }}>
        <App />
      </DesignableContext.Provider>
    </GlobalContext.Provider>
  )
}

export default Provider