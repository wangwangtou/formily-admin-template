import React, { useEffect, useRef, useState } from 'react'
import { useField, Field, observer, connect, mapProps } from '@formily/react'
import { IconWidget, usePrefix } from '@designable/react'
import { Select, Input, NumberPicker, FormItem } from '@formily/antd'
import { InputItems, createPolyInput } from '@designable/react-settings-form'
import { FoldItem } from '../FoldItem'
import cls from 'classnames'
import './style.less'
import { Button } from 'antd'
import { Field as FCField } from '@formily/core'

export interface IGridLayoutSetterProps {
  className?: string
  style?: React.CSSProperties
  value?: object | number
  onChange?: (value: string) => void
}

export const LayoutColSetter: React.FC<IGridLayoutSetterProps> = observer(
  (props) => {
    const field = useField()
    const prefix = usePrefix('grid-layout-setter')
    const [detail, setDetail] = useState(
      typeof props.value !== 'number'
      && typeof props.value !== 'undefined'
      && props.value !== null)
    const toDetail = (val) => {
      return typeof val === 'number' ? { span: val } : val
    }
    const toSimple = (val) => {
      return val && typeof val.span === 'number' ? val.span : val
    }
    const typesValue = useRef({
      detail: toDetail(props.value),
      simple: toSimple(props.value),
    })
    const createDetailHandler = (type, props) => {
      return {
        ...props,
        value: type === 'simple' ? props.value : 
          (props.value ? props.value[type] : 0),
        onChange: (value) => {
          if (type == 'simple') {
            typesValue.current.simple = value
            props.onChange?.(value)
          } else {
            typesValue.current.detail = {
              ...typesValue.current.detail,
              [type]: value
            }
            props.onChange?.(typesValue.current.detail)
          }
        }
      }
    }

    return (
      <FoldItem className={cls(prefix, props.className)} label={field.title} expand={detail}>
        <FoldItem.Base>
          <div className={prefix+'-button-wrap'}>
            {
              detail
              ?
              <></>
              : 
            <NumberPicker
              {...createDetailHandler('simple', props)}
            />
            }
            <Button
              style={{
                width: detail ? '100%' : 'auto'
              }}
              className={prefix + '-controller'}
              block
              onClick={() => {
                const newVal = detail ? typesValue.current.simple : typesValue.current.detail
                setDetail(!detail)
                props.onChange?.(
                  newVal
                )
              }}
            >
              <IconWidget infer={detail ? 'Menu' : 'Number'} />
            </Button>
          </div>
        </FoldItem.Base>
        <FoldItem.Extra>
          <InputItems className={prefix + '-input-items'}>
            {/* <InputItems.Item title="flex 布局属性">
              <NumberPicker
                {...createDetailHandler('flex', props)}
              />
            </InputItems.Item> */}
            <InputItems.Item title="左间隔格数">
              <NumberPicker
                {...createDetailHandler('offset', props)}
              />
            </InputItems.Item>
            <InputItems.Item title="栅格顺序">
              <NumberPicker
                {...createDetailHandler('order', props)}
              />
            </InputItems.Item>
            <InputItems.Item title="左移格数">
              <NumberPicker
                {...createDetailHandler('pull', props)}
              />
            </InputItems.Item>
            <InputItems.Item title="右移格数">
              <NumberPicker
                {...createDetailHandler('push', props)}
              />
            </InputItems.Item>
            <InputItems.Item title="占位格数">
              <NumberPicker
                {...createDetailHandler('span', props)}
              />
            </InputItems.Item>
          </InputItems>
        </FoldItem.Extra>
      </FoldItem>
    )
  }
)

const SIZES = [
  { value: 'xl', label: 'XL' },
  { value: 'lg', label: 'LG' },
  { value: 'xxl', label: 'XXL' },
  { value: 'md', label: 'MD' },
  { value: 'sm', label: 'SM' },
  { value: 'xs', label: 'XS' },
]

export const LayoutGutterSetter: React.FC<IGridLayoutSetterProps> = observer(
  (props) => {
    const field = useField()
    const prefix = usePrefix('grid-layout-setter')
    const [detail, setDetail] = useState(
      typeof props.value !== 'number'
      && typeof props.value !== 'undefined'
      && props.value !== null)
    const toDetail = (val) => {
      return typeof val === 'number' ? { [SIZES[0].value]: val } : val
    }
    const toSimple = (val) => {
      for(let i=0;i<SIZES.length;i++) {
        if (val && typeof val[SIZES[i].value] === 'number') {
          return val[SIZES[i].value]
        }
      }
      return val
    }
    const typesValue = useRef({
      detail: toDetail(props.value),
      simple: toSimple(props.value),
    })
    const createDetailHandler = (type, props) => {
      return {
        ...props,
        value: type === 'simple' ? props.value : 
          (props.value ? props.value[type] : 0),
        onChange: (value) => {
          if (type == 'simple') {
            typesValue.current.simple = value
            props.onChange?.(value == null ? 0 : value)
          } else {
            typesValue.current.detail = {
              ...typesValue.current.detail,
              [type]: value
            }
            props.onChange?.(typesValue.current.detail)
          }
        }
      }
    }

    return (
      <FoldItem className={cls(prefix, props.className)} label={field.title} expand={detail}>
        <FoldItem.Base>
          <div className={prefix+'-button-wrap'}>
            {
              detail
              ?
              <></>
              : 
            <NumberPicker
              {...createDetailHandler('simple', props)}
            />
            }
            <Button
              style={{
                width: detail ? '100%' : 'auto'
              }}
              className={prefix + '-controller'}
              block
              onClick={() => {
                const newVal = detail ? typesValue.current.simple : typesValue.current.detail
                setDetail(!detail)
                props.onChange?.(
                  newVal
                )
              }}
            >
              <IconWidget infer={detail ? 'Menu' : 'Number'} />
            </Button>
          </div>
        </FoldItem.Base>
        <FoldItem.Extra>
          <InputItems className={prefix + '-input-items'}>
            {/* <InputItems.Item title="flex 布局属性">
              <NumberPicker
                {...createDetailHandler('flex', props)}
              />
            </InputItems.Item> */}
            {
              SIZES.map(size => (
                <InputItems.Item title={size.label}>
                  <NumberPicker
                    {...createDetailHandler(size.value, props)}
                  />
                </InputItems.Item>
              ))
            }
          </InputItems>
        </FoldItem.Extra>
      </FoldItem>
    )
  }
)