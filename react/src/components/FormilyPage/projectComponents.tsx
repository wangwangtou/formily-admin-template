import React from 'react'
import { connect, mapProps, useField } from '@formily/react'
import { observer } from '@formily/reactive-react'
import { Button as AButton, ButtonProps as AButtonProps, Tooltip as ATooltip, Row, Col
  , Pagination as APagination, PaginationProps as APaginationProps
  , Rate as ARate
  , Dropdown as ADropdown, DropdownProps as ADropdownProps
  , Tree as ATree,
  Menu
} from 'antd'
import { ArrayTable as FArrayTable, ArrayBase } from '@formily/antd'
// import SortableJs from 'sortablejs'

function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

interface FormatterType {
  [key: string]: (value: any, format: any, defVla: any) => any
}

const formatters: FormatterType = {
  timestamp: (value, format, defVal) => {
    return parseTime(value, format)
  },
  map: (value, format, defVal) => {
    return format[value] || defVal || value
  }
}

const InputNative = 'input'
const AdminTitle = 'div'

interface CommonComponentProps {
  className: string,
  style: React.CSSProperties | string
}

const getStyle = (style: React.CSSProperties | string) : React.CSSProperties =>  {
  if (typeof style === 'string') return null
  return style
}

interface FormatPreviewProps {
  type: string,
  format: any,
  default: string,
  value: number | string | Date
}

const FormatPreview: React.FunctionComponent<FormatPreviewProps & CommonComponentProps> = (props) => {
  const previewText = formatters[props.type](props.value, props.format, props.default)
  return (
    <span className={props.className} style={getStyle(props.style)}>{previewText}</span>
  )
}

const Button : React.FunctionComponent<AButtonProps> = (props) => {
  const icon = typeof props.icon == 'string' && props.icon.indexOf('el-') == 0 ?
    (<i className={props.icon}></i>) : props.icon
  const sizeMap = {
    mini: 'small',
    small: 'middle',
    medium: 'large'
  }
  let className = props.className || ''
  let type: string = props.type
  if (type == 'success') {
    type = 'primary'
    className = className + ' ant-btn-success'
  }
  return (
    <AButton {...props}
      icon={icon}
      size={sizeMap[props.size] || props.size || 'middle'}
      type={type}
      className={className}
      ></AButton>
  )
}

// formily/antd 的 ArrayTable.SortHandle 是有效的，不需要单独实现
const Sortable: React.FunctionComponent = ({
  children
}) => {
  return (
    <>{children}</>
  )
}
// formily/antd 的 ArrayTable.SortHandle 用到了 Table的rowKey属性，覆盖后会导致SortHandle的bug
const ArrayTable : React.FunctionComponent<any> = ({ rowKey, ...props }) => {
  return (
    <FArrayTable {...props}></FArrayTable>
  )
}
ArrayTable.displayName = FArrayTable.displayName
ArrayTable.Addition = FArrayTable.Addition
ArrayTable.Column = FArrayTable.Column
ArrayBase.mixin(ArrayTable)


const Tooltip = connect(ATooltip, mapProps((props: any) => {
  return {
    visible: props.open
  }
}))
const Rate = ARate // observer(ARate)

interface DropdownProps {
  title: string,
  wrapItem: boolean,
  dropdownClass: string,
  dropdownStyle: React.CSSProperties | string
}
const Dropdown = observer<DropdownProps & ADropdownProps>(props => {
  return (
    <ADropdown {...props} trigger={["click"]}
      overlay={
        props.wrapItem ?
        <Menu
          className={props.dropdownClass}
          style={getStyle(props.dropdownStyle)}
        >
          <Menu.Item>{props.children}</Menu.Item>
        </Menu> : <>{props.children}</>
      }>
      <Button>
        {props.title || ''},
        <i className='el-icon-caret-bottom el-icon--right'></i>
      </Button>
    </ADropdown>
  )
})
  
const getPaginationDefault = () => {
  return { current: 1, size: 10 }
}

interface PaginationProps {
  value?: { current: number, size: number },
  onChange: ({ current, size }) => void
}

const Pagination : React.FunctionComponent<PaginationProps & APaginationProps & CommonComponentProps> = (props) => {
  const { current, size } = props.value || getPaginationDefault()
  return (
    <APagination {...props}
      style={getStyle(props.style)}
      pageSize={size || 10}
      current={current || 1}
      onChange={(page, pageSize) => {
        props.onChange && props.onChange({ current: page, size: pageSize })
      }}></APagination>
  )
}

const Link: React.FunctionComponent = (props) => {
  return (
    <Button  {...props} type='link'/>
  )
}

const TreeSelect = ATree
export {
  Sortable, ArrayTable, Row, Col, Button, Dropdown, Link, Tooltip, Pagination, FormatPreview, InputNative, AdminTitle, Rate, TreeSelect
}
