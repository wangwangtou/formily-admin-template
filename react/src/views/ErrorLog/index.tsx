import React from 'react'

import { ErrorA } from './components/ErrorTestA'
import { ErrorB } from './components/ErrorTestB'

export const ErrorLog: React.FunctionComponent = () => {
  return (
    <div className="errPage-container">
      <ErrorA />
      <ErrorB />
      <h3>Please click the bug icon in the upper right corner</h3>
      <aside>
        Now the management system are basically the form of the spa, it enhances the user experience, but it also increases the possibility of page problems, a small negligence may lead to the entire page deadlock. Fortunately Vue provides a way to catch handling exceptions, where you can handle errors or report exceptions.
        <a target="_blank" className="link-type" href="https://panjiachen.github.io/vue-element-admin-site/guide/advanced/error.html">
          Document introduction
        </a>
      </aside>
      <a href="#">
        <img src="https://wpimg.wallstcn.com/360e4842-4db5-42d0-b078-f9a84a825546.gif" />
      </a>
    </div>
  )
}