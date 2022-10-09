
import React from 'react'
import { Outlet } from 'react-router-dom'

export const AppMain: React.FunctionComponent = () => {
  return (
    <section className="app-main">
      <Outlet />
      {/* <transition name="fade-transform" mode="out-in"> */}
        {/* <keep-alive :include="cachedViews"> */}
          {/* <router-view :key="key" /> */}
        {/* </keep-alive> */}
      {/* </transition> */}
    </section>
  )
}