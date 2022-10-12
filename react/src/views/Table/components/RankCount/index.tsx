import { SvgIcon } from '@/components'
import React, { useState, useEffect } from 'react'

interface RankCountProps {
  className?: string,
  value?: number
}

export const RankCount: React.FunctionComponent<RankCountProps> = ({
  value
}) => {
  const items = []
  value = +value
  for(let i=0;i<value;i++) {
    items.push(<SvgIcon iconClass='star' className='icon-star'></SvgIcon>)
  }
  return (
    <>{items}</>
  )
}