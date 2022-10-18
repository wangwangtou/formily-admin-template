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
import { ArrayTable as FArrayTable, ArrayBase, Input as FInput, Password as FPassword, DatePicker as FDatePicker } from '@formily/antd'
import { ElIcon } from '../ElIcon'
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

export interface CommonComponentProps {
  className: string,
  style: React.CSSProperties | string
}

const getStyle = (style: React.CSSProperties | string) : React.CSSProperties =>  {
  if (typeof style === 'string') return null
  return style
}

export interface FormatPreviewProps {
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

export interface DropdownProps {
  title: string,
  wrapItem: boolean,
  dropdownClass: string,
  dropdownStyle: React.CSSProperties | string
}
const Dropdown = observer<DropdownProps & ADropdownProps>(props => {
  return (
    <ADropdown {...props} trigger={["click"]}
      placement="bottomRight"
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
        {props.title || ''}
        <i className='el-icon-caret-bottom el-icon--right'></i>
      </Button>
    </ADropdown>
  )
})
  
const getPaginationDefault = () => {
  return { current: 1, size: 10 }
}

export interface PaginationProps {
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

const Input = ({prepend, prefixIcon, ...props}) => {
  return (
    <FInput addonBefore={(prefixIcon || prepend) ? <>
      {prefixIcon ? <i className={prefixIcon} /> : null}
      {prepend}
    </> : null} {...props}/>
  )
}
Input.displayName = FInput.displayName
Input.TextArea = FInput.TextArea

const Password = ({prefixIcon, ...props}) => {
  return (
    <FPassword addonBefore={prefixIcon ? <>
      {prefixIcon ? <i className={prefixIcon} /> : null}
    </> : null} {...props}/>
  )
}
Password.displayName = FPassword.displayName

const TreeSelect = ATree

// el-ui 用的format格式 DD表示星期， dd 表示天， 在antd里不一样
const DatePicker = ({format, ...props}) => {
  const cvtFormat = format ? format.replace(/y/g,'Y')
    .replace(/[Dd]/g, function (val) {
      return val == 'D' ? 'd' : 'D'
    }) : null
  return (
    <FDatePicker format={cvtFormat} {...props}/>
  )
}
DatePicker.displayName = FDatePicker.displayName

export {
  Sortable, ArrayTable, Input, Password, DatePicker, Row, Col, Button, Dropdown, Link, Tooltip, Pagination, FormatPreview, InputNative, AdminTitle, Rate, TreeSelect
}
