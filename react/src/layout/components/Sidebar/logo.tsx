import React from 'react'
import { NavLink } from 'react-router-dom'

interface LogoProps {
  collapse: boolean
}

export const Logo: React.FunctionComponent<LogoProps> = ({ collapse }) => {
  const data = {
    title: 'React Admin Template',
    logo: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png'
  }
  return (
    <div className={"sidebar-logo-container " + (collapse ? 'collapse' : '')}>
      {/* <transition name="sidebarLogoFade"> */}
        <NavLink className="sidebar-logo-link" to="/">
          <img src={data.logo} className="sidebar-logo"/>
          { collapse ? null : <h1 className="sidebar-title">{ data.title }</h1> }
        </NavLink>
      {/* </transition> */}
    </div>
  )
}