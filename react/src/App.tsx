
import React, { useEffect, createContext } from 'react'
import { useLocation, matchRoutes, renderMatches, Navigate } from 'react-router-dom'
import {
  createAppState,
  createSettingState,
  createPermissionState,
  GlobalContext,
  hasPermission,
  createUserState,
  createErrorLogState,

  RouteContext
} from './hooks'
import { routers, Route } from './router'
import getPageTitle from '@/utils/get-page-title'


const RouterElement: React.FunctionComponent<{ roles: string[], token: string }> = ({ roles, token }) => {
  const location = useLocation()
  // const element = useRoutes(routers)
  const routes = matchRoutes(routers, location)

  useEffect(() => {
    const curRoute: any = routes[0]
    document.title = getPageTitle(curRoute && curRoute.meta ? curRoute.meta.title : '')
  }, [location])
  const permission = routes.length ? hasPermission(roles, routes[0].route) : false
  const whiteList = ['/login', '/auth-redirect'] 
  return (
    <RouteContext.Provider value={routes}>
      {/* {location.pathname} */}
      { token 
        ? (location.pathname == '/login' 
          ? <Navigate to={'/'}/> 
          : (permission 
            ? renderMatches(routes)
            : null)
          )
        : (
          whiteList.indexOf(location.pathname) !== -1
          ? renderMatches(routes)
          : <Navigate to={'/login?redirect='+location.pathname}/>
        ) }
    </RouteContext.Provider>
  )
}

export const App: React.FunctionComponent = () => {
  const appState = createAppState()
  const settingState = createSettingState()
  const permissionState = createPermissionState()
  const userState = createUserState()
  const errorLogState = createErrorLogState()
  useEffect(() => {
    const loadUserInfo = async () => {
      await userState.userActions.getInfo()
      await permissionState.permissionActions.generateRoutes(userState.userState.roles)
    }
    if (userState.userState.token) {
      loadUserInfo()
    }
  }, [userState.userState.token])
  return (
    <GlobalContext.Provider value={{
      ...appState,
      ...settingState,
      ...permissionState,
      ...userState,
      ...errorLogState
      }}>
      <RouterElement roles={userState.userState.roles} token={userState.userState.token}/>
    </GlobalContext.Provider>
  )
}
export default App
