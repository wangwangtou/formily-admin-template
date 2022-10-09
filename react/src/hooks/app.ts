import Cookies from 'js-cookie'
import React, { useContext, useState } from 'react'
import { GlobalContext } from './context'

type DeviceType = 'desktop' | 'mobile'
type ComponentSize = 'normal' | 'medium'

interface AppStateDataType {
  sidebar: {
    opened: boolean,
    withoutAnimation: boolean
  },
  device: DeviceType,
  size: ComponentSize
}

interface AppActionsType {
  toggleSidebar: () => void,
  closeSidebar: (withoutAnimation: boolean) => void,
  toggleDevice: (device: DeviceType) => void,
  setSize: (size: ComponentSize) => void,
}

interface AppState {
  appState: AppStateDataType,
  setAppState: React.Dispatch<React.SetStateAction<AppStateDataType>>,
  appActions: AppActionsType,
}

const initialState: AppStateDataType = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop',
  size: Cookies.get('size') || 'medium'
}


export function createAppState(): AppState {
  const [ appState, setAppState ] = useState(initialState)
  
  const appActions: AppActionsType = {
    toggleSidebar: () => {
      const opened = !appState.sidebar.opened
      setAppState({
        ...appState,
        sidebar: {
          opened,
          withoutAnimation: false
        }
      })
      if (opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
    },
    closeSidebar: (withoutAnimation) => {
      Cookies.set('sidebarStatus', 0)
      setAppState({
        ...appState,
        sidebar: {
          opened: false,
          withoutAnimation
        }
      })
    },
    toggleDevice: (device) => {
      setAppState({
        ...appState,
        device,
      })
    },
    setSize: (size) => {
      setAppState({
        ...appState,
        size,
      })
      Cookies.set('size', size)
    }
  }
  return {
    appState,
    setAppState,
    appActions
  }
}

export function useAppState(): AppState {
  const {
    appState,
    setAppState,
    appActions
  } = useContext(GlobalContext)
  return {
    appState,
    setAppState,
    appActions
  }
}
