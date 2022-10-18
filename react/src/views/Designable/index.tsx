import React from 'react'
import Provider from '@/designable/main'

import { Store } from 'formily/views'
import { useSearchParams } from 'react-router-dom'


export const Designable: React.FunctionComponent = () => {
  const [params] = useSearchParams()
  const editKey = params.get('key')
  const editData = Store[editKey]
  const returnPath = params.get('returnPath')
  return (
    <Provider
      editKey={editKey}
      returnPath={returnPath}
      editData={editData}
      onSaveData={(data) => {
        console.log(data)
        Store.save(editKey, data)
      }}>
    </Provider>
  )
}