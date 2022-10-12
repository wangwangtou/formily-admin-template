import React from 'react'
import { connect, mapProps, useField } from '@formily/react'
import { observer } from '@formily/reactive-react'
import { Button, Tooltip as ATooltip, Row, Col
  , Pagination as APagination, PaginationProps as APaginationProps
  , Rate as ARate
  , Dropdown as ADropdown, DropdownProps as ADropdownProps
  , Tree as ATree,
  Menu
} from 'antd'
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

const Sortable: React.FunctionComponent = () => {
  return (
    <>Sortable</>
  )
}
// const Sortable = defineComponent({
//   props: {
//     arrayField: String,
//     containerSelector: String,
//     ghostClass: {
//       type: String,
//       default: 'sortable-ghost'
//     }
//   },
//   setup(props, { attrs, slots, ...data }) {
//     var fieldRef = useField()
//     onMounted(() => {
//       const vm = getCurrentInstance()
//       const elm = vm.vnode.elm
//       const el = elm.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
//       SortableJs.create(el, {
//         ghostClass: props.ghostClass, // Class name for the drop placeholder,
//         setData: function(dataTransfer) {
//           // to avoid Firefox bug
//           // Detail see : https://github.com/RubaXa/Sortable/issues/1012
//           dataTransfer.setData('Text', '')
//         },
//         onEnd: evt => {
//           const { oldIndex, newIndex } = evt
//           const arrayField = fieldRef.value.query(props.arrayField).take()
//           arrayField.move(oldIndex, newIndex)
//           // const targetRow = this.list.splice(evt.oldIndex, 1)[0]
//           // this.list.splice(evt.newIndex, 0, targetRow)

//           // // for show the changes, you can delete in you code
//           // const tempIndex = this.newList.splice(evt.oldIndex, 1)[0]
//           // this.newList.splice(evt.newIndex, 0, tempIndex)
//         }
//       })
//     })
//     data.attrs = attrs
//     return function() {
//       return h('div', data, slots.default())
//     }
//   }
// })
const Tooltip = connect(ATooltip, mapProps((props: any) => {
  return {
    visible: props.open
  }
}))
const Rate = observer(ARate)

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
  Sortable, Row, Col, Button, Dropdown, Link, Tooltip, Pagination, FormatPreview, InputNative, AdminTitle, Rate, TreeSelect
}
