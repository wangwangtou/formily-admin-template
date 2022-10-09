import { asyncRoutes, constantRoutes, Route } from '@/router'
import { useContext, useState } from 'react'
import { GlobalContext } from './context'

type Role = string

export type RouteElementState = 'loading' | 'loaded'

export function hasPermission(roles: Role[], route: Route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

export function filterAsyncRoutes(routes: Route[], roles: Role[]) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

interface PermissionStateDataType {
  routes: Route[],
  addRoutes: Route[],
}

interface PermissionActionsType {
  generateRoutes: (roles: Role[]) => Promise<void>
}

interface PermissionState {
  permissionState: PermissionStateDataType,
  setPermissionState: React.Dispatch<React.SetStateAction<PermissionStateDataType>>,
  permissionActions: PermissionActionsType,
}

const initialState: PermissionStateDataType = {
  routes: [],
  addRoutes: []
}

export function createPermissionState(): PermissionState {
  const [ permissionState, setPermissionState ] = useState(initialState)
  const permissionActions: PermissionActionsType = {
    generateRoutes(roles) {
      return new Promise(resolve => {
        let accessedRoutes
        if (roles.includes('admin')) {
          accessedRoutes = asyncRoutes || []
        } else {
          accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        }
        setPermissionState({
          addRoutes: accessedRoutes,
          routes: constantRoutes.concat(accessedRoutes)
        })
        resolve()
      })
    }
  }
  return {
    permissionState,
    setPermissionState,
    permissionActions
  }
}

export function usePermissionState(): PermissionState {
  const {
    permissionState,
    setPermissionState,
    permissionActions
  } = useContext(GlobalContext)
  return {
    permissionState,
    setPermissionState,
    permissionActions
  }
}
