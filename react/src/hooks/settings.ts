// import variables from '@/styles/element-variables.scss'
import defaultSettings from '@/settings'
import React, { useContext, useState } from 'react'
import { GlobalContext } from './context'

const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings


interface SettingStateDataType {
  theme: string,
  showSettings: boolean,
  tagsView: boolean,
  fixedHeader: boolean,
  sidebarLogo: boolean
}

interface ActionParam {
  key: string,
  value: boolean | string
}

interface SettingActionsType {
  changeSetting: (param: ActionParam) => void
}

interface SettingState {
  settingState: SettingStateDataType,
  setSettingState: React.Dispatch<React.SetStateAction<SettingStateDataType>>,
  settingActions: SettingActionsType,
}

const initialState : SettingStateDataType = {
  theme: "#1890ff",
  showSettings: showSettings,
  tagsView: tagsView,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo
}

export function createSettingState(): SettingState {
  const [ settingState, setSettingState ] = useState(initialState)
  const settingActions: SettingActionsType = {
    changeSetting(param) {
      setSettingState({
        ...settingState,
        [param.key]: param.value
      })
    }
  }
  return {
    settingState, setSettingState, settingActions
  }
}

export function useSettingState(): SettingState {
  const {
    settingState,
    setSettingState,
    settingActions
  } = useContext(GlobalContext)
  return {
    settingState,
    setSettingState,
    settingActions
  }
}

// const mutations = {
//   CHANGE_SETTING: (state, { key, value }) => {
//     // eslint-disable-next-line no-prototype-builtins
//     if (state.hasOwnProperty(key)) {
//       state[key] = value
//     }
//   }
// }

// const actions = {
//   changeSetting({ commit }, data) {
//     commit('CHANGE_SETTING', data)
//   }
// }

// export default {
//   namespaced: true,
//   state,
//   mutations,
//   actions
// }

