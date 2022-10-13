import React, { useContext, useState } from 'react'
import { GlobalContext } from './context'

interface Log {
  err: {
    message: string,
    stack: string,
  },
  tag: string,
  info: string,
  url: string,
}

interface ErrorLogStateDataType {
  logs: Log[]
}

interface ErrorLogActionsType {
  addErrorLog: (log: Log) => void,
  clearErrorLog: () => void
}

interface ErrorLogState {
  errorLogState: ErrorLogStateDataType,
  setErrorLogState: React.Dispatch<React.SetStateAction<ErrorLogStateDataType>>,
  errorLogActions: ErrorLogActionsType,
}

const initialState: ErrorLogStateDataType = {
  logs: [
    // {
    //   err: new Error(),
    //   tag: 'div',
    //   info: 'string'
    // }
  ]
}

export function createErrorLogState(): ErrorLogState {
  const [ errorLogState, setErrorLogState ] = useState(initialState)
  const errorLogActions: ErrorLogActionsType = {
    addErrorLog: (log) => {
      setErrorLogState({ logs: [].concat(errorLogState.logs, [log]) }) 
    },
    clearErrorLog: () => {
      setErrorLogState({ logs: [] }) 
    }
  }
  return {
    errorLogState,
    setErrorLogState,
    errorLogActions
  }
}

export function useErrorLogState(): ErrorLogState {
  const {
    errorLogState,
    setErrorLogState,
    errorLogActions
  } = useContext(GlobalContext)
  return {
    errorLogState,
    setErrorLogState,
    errorLogActions
  }
}

// const mutations = {
//   ADD_ERROR_LOG: (state, log) => {
//     state.logs.push(log)
//   },
//   CLEAR_ERROR_LOG: (state) => {
//     state.logs.splice(0)
//   }
// }

// const actions = {
//   addErrorLog({ commit }, log) {
//     commit('ADD_ERROR_LOG', log)
//   },
//   clearErrorLog({ commit }) {
//     commit('CLEAR_ERROR_LOG')
//   }
// }

// export default {
//   namespaced: true,
//   state,
//   mutations,
//   actions
// }
