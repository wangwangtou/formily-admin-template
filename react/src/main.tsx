
import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from "react-router-dom";
import App from './App'
import './icons' // icon
import '@/styles/index.less' // global css

ReactDOM.render((
  <HashRouter>
    <App />
  </HashRouter>
), document.getElementById('app'))
