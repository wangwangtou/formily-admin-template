import React, { createContext } from 'react'

export interface IDesignableContext {
  returnPath: string,
  editKey: string,
  currentData: React.MutableRefObject<Object>, 
  getData: () => Object
  saveData: (data: Object) => Promise<void> | void  
}

export const DesignableContext = createContext<IDesignableContext>({
  returnPath: null,
  editKey: null,
  saveData: null,
  getData: null,
  currentData: null,
})