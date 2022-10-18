import React from 'react'
import { FormilyPage } from '@/components'

import { Store } from 'formily/views'
// import page from 'formily/views/example/create'

import { scope, components } from './example'

export const ExampleCreate: React.FunctionComponent = () => {
  return (
    <div className="createPost-container">
      <FormilyPage schema={Store.ExampleCreate} components={components} scope={scope} schemaKey="ExampleCreate" />
    </div>
  )
}