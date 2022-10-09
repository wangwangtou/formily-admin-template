import React, { useState } from 'react'

interface SidebarItemProps {
}

export const SidebarItem: React.FunctionComponent<SidebarItemProps> = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  )
}