import {
  Form,
  Field,
  Input,
  Select,
  TreeSelect,
  Cascader,
  Radio,
  // Checkbox,
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
  AllSchemas,
} from '@designable/formily-antd'


import * as ProjectComponents from './components'

import { wrapDefaultInput } from './components/shared'

const WInput = wrapDefaultInput(Input)

import {
  LayoutColSetter,
  LayoutGutterSetter,
} from './setters'

const {
  Row, Col, Dropdown, Sticky, Container, Checkbox, ..._ProjectComponents
} = ProjectComponents


export const SourcesInputs = [
  WInput,
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
]
export const SourcesLayouts = [
  Card,
  FormGrid,
  FormTab,
  FormLayout,
  FormCollapse,
  Space,

  Row,
  Col,
  Dropdown, Sticky, Container,
]
export const SourcesArrays = [
  ArrayCards,
  ArrayTable
]
export const SourcesDisplays = [
  Text,
  ...Object.values(_ProjectComponents)
]
console.log(SourcesDisplays)
export const SourcesProject = [
  // ...Object.values(_ProjectComponents)
]
export const DesignableAll = {
  Form,
  Field,
  Input: WInput,
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
  ...ProjectComponents
}

export const Setters = {
  LayoutColSetter,
  LayoutGutterSetter,
}