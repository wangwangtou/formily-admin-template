import React, { useState, useEffect } from 'react'

import './style.less'

interface MallkiProps {
  className?: string,
  text: string
}

export const Mallki: React.FunctionComponent<MallkiProps> = ({
  className,
  text,
}) => {
  return (
    <a className={className + ' link--mallki'} href="#">
      { text }
      <span data-letters={text} />
      <span data-letters={text} />
    </a>
  )
}

interface TextHoverEffectProps {
}

export const TextHoverEffect: React.FunctionComponent<TextHoverEffectProps> = ({
}) => {
  return (
    <>TextHoverEffect</>
  )
}