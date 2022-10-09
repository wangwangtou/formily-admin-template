import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import React, { useState, useContext } from 'react'
import { GlobalContext } from './context'
// import router, { resetRouter } from '@/router'

type Role = string

interface UserStateDataType {
  token: string,
  name: string,
  avatar: string,
  introduction: string,
  roles: Role[]
}

interface UserActionsType {
  login: ({ username, password }) => Promise<void>,
  // get user info
  getInfo: () => Promise<void>,
  // user logout
  logout: () => Promise<void>,
  resetToken: () => void,
  changeRoles: (role: string) => Promise<void>
}

interface UserState {
  userState: UserStateDataType,
  setUserState: React.Dispatch<React.SetStateAction<UserStateDataType>>,
  userActions: UserActionsType,
}


const initialState: UserStateDataType = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

export function createUserState(): UserState {
  const [ userState, setUserState ] = useState(initialState)
  const userActions: UserActionsType = {
    async login({ username, password }) {
      const { data } = await login({ username: username.trim(), password: password })
      setUserState({
        ...userState,
        token: data.token
      })
      setToken(data.token)
    },
  
    // get user info
    async getInfo() {
      const { data } = await getInfo(userState.token)
      
      if (!data) {
        throw new Error('Verification failed, please Login again.')
      }

      const { roles, name, avatar, introduction } = data

      // roles must be a non-empty array
      if (!roles || roles.length <= 0) {
        throw new Error('getInfo: roles must be a non-null array!')
      }
      setUserState({
        ...userState,
        roles,
        name,
        avatar,
        introduction,
      })
    },
  
    // user logout
    async logout() {
      await logout()
      setUserState({
        ...userState,
        token: '',
        roles: [],
      })
      removeToken()
      // resetRouter()
      // dispatch('tagsView/delAllViews', null, { root: true })
    },
  
    // remove token
    resetToken() {
      setUserState({
        ...userState,
        token: '',
        roles: [],
      })
      removeToken()
    },
  
    // dynamically modify permissions
    async changeRoles(role) {
      const token = role + '-token'
      setUserState({
        ...userState,
        token,
      })
      setToken(token)
  
      // const { roles } = await dispatch('getInfo')
      // resetRouter()
      // // generate accessible routes map based on roles
      // const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
      // // dynamically add accessible routes
      // router.addRoutes(accessRoutes)
  
      // reset visited views and cached views
      // dispatch('tagsView/delAllViews', null, { root: true })
    }
  }
  return {
    userState,
    setUserState,
    userActions,
  }
}

export function useUserState(): UserState {
  const {
    userState,
    setUserState,
    userActions
  } = useContext(GlobalContext)
  return {
    userState,
    setUserState,
    userActions
  }
}
