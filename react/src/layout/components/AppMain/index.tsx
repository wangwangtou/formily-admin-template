
import { ErrorBoundary } from '@/components'
import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'

export const AppMain: React.FunctionComponent = () => {
  const location = useLocation()
  return (
    <section className="app-main">
      <ErrorBoundary location={location}>
        <Outlet />
      </ErrorBoundary>
      {/* <transition name="fade-transform" mode="out-in"> */}
        {/* <keep-alive :include="cachedViews"> */}
          {/* <router-view :key="key" /> */}
        {/* </keep-alive> */}
      {/* </transition> */}
    </section>
  )
}