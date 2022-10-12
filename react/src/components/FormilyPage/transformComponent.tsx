import React from 'react'

export const wrapComponent = (component, wrap, props) => {
  const { class: className, ..._props } = props
  _props.className= className
  const Result: React.FunctionComponent = (compProps) => {
    return React.createElement(wrap, _props, React.createElement(component, compProps))
  }
  return Result
}