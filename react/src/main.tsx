
import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from "react-router-dom";
import App from './App'
import './icons' // icon
import '@formily/antd/dist/antd.css';
import '@/utils/schemaPatches'
import '@/styles/index.less' // global css

ReactDOM.render((
  <HashRouter>
    <App />
  </HashRouter>
), document.getElementById('app'))
