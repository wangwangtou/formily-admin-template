import React from 'react'
import { Navigate, RouteObject } from 'react-router-dom'
import { Layout } from '@/layout'
import {
  AuthRedirect,
  Designable,
  Login,
  V401,
  V404,
  Redirect,
  Dashboard,
  Profile,
  TableComplex,
  TableDynamic,
  TableDrag,
  TableInlineEdit,
  ExampleList,
  ExampleCreate,
  ExampleEdit,
  ErrorLog,
} from '@/views'

export interface RouteMeta {
  title: string,
  activeMenu?: string,
  roles?: string[],
  icon?: string,
  noCache?: boolean,
  affix?: boolean
}

export interface Route extends RouteObject {
  hidden?: boolean,
  name?: string,
  meta?: RouteMeta,
  children?: Route[]
}

export const constantRoutes: Route[] = [
  { path: '/redirect/', element: <Layout />, hidden: true,
    children: [
      { path: ':path(.*)', element: <Redirect />},
    ]
  },
  { path: '/login', element: <Login />, hidden: true },
  { path: '/auth-redirect', element: <AuthRedirect />, hidden: true },
  { path: '/404', element: <V404 />, hidden: true },
  { path: '/401', element: <V401 />, hidden: true },
  { path: '/designable', element: <Designable />, hidden: true },
  { path: '/', element: <Layout />, 
    children: [
      { path: '', element: <Navigate to={"/dashboard"} />, hidden: true },
      { path: 'dashboard', element: <Dashboard />, name: 'Dashboard', meta: { title: 'Dashboard', icon: 'dashboard', affix: true } },
    ]
  },
  { path: '/profile', element: <Layout />, hidden: true,
    children: [
      { path: '', element: <Profile />, name: 'Profile', meta: { title: 'Profile', icon: 'user', noCache: true } },
    ]
  },
]

export const asyncRoutes: Route[] = [
  { path: '/table/', element: <Layout />, name: 'Table', meta: { title: 'Table', icon: 'table' },
    children: [
      { path: '', element: <Navigate to="/table/complex-table"/>, hidden: true },
      { path: 'complex-table', element: <TableComplex />, name: 'ComplexTable', meta: { title: 'Complex Table' } },
      { path: 'dynamic-table', element: <TableDynamic />, name: 'DynamicTable', meta: { title: 'Dynamic Table' } },
      { path: 'drag-table', element: <TableDrag />, name: 'DragTable', meta: { title: 'Drag Table' } },
      { path: 'inline-edit-table', element: <TableInlineEdit />, name: 'InlineEditTable', meta: { title: 'Inline Edit Table' } },
    ]
  },
  { path: '/example/', element: <Layout />, name: 'Example', meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      { path: '', element: <Navigate to="/example/list"/>, hidden: true },
      { path: 'list', element: <ExampleList />, name: 'ArticleList', meta: { title: 'Article List', icon: 'list' }},
      { path: 'create', element: <ExampleCreate />, name: 'CreateArticle', meta: { title: 'Create Article', icon: 'edit' } },
      { path: 'edit/:id(\\d+)', element: <ExampleEdit />, name: 'EditArticle', meta: { title: 'Edit Article', noCache: true, activeMenu: 'ArticleList' }, hidden: true },
    ]
  },
  { path: '/error/', element: <Layout />, name: 'ErrorPages', meta: { title: 'Error Pages', icon: '404' },
    children: [
      { path: '', element: <Navigate to="/error/404"/>, hidden: true },
      { path: '404', element: <V404 />, name: 'Page404', meta: { title: '404', noCache: true } },
      { path: '401', element: <V401 />, name: 'Page401', meta: { title: '401', noCache: true } },
    ]
  },
  { path: '/error-log', element: <Layout />,
    children: [
      { path: '', element: <ErrorLog />, name: 'ErrorLog', meta: { title: 'Error Log', icon: 'bug' } },
    ]
  },
  { path: '*', element: <Navigate to="404"/>, hidden: true },
]

export const routers = [].concat(constantRoutes, asyncRoutes)

// export const routers = [
//   { path: '/login', element: <Login /> },
//   { path: '/auth-redirect', element: <AuthRedirect /> },
//   { path: '/404', element: <V404 /> },
//   { path: '/401', element: <V401 /> },
//   { path: '/designable', element: <Designable /> },
//   { path: '/', element: <Layout />,
//     children: [
//       { path: 'redirect/:path(.*)', element: <Redirect />},
//       { path: 'dashboard', element: <Dashboard />},
//       { path: 'profile', element: <Profile />},
//       { path: 'table', element: <Navigate to="/table/complex-table"/> },
//       { path: 'table/complex-table', element: <TableComplex /> },
//       { path: 'table/dynamic-table', element: <TableDynamic /> },
//       { path: 'table/drag-table', element: <TableDrag /> },
//       { path: 'table/inline-edit-table', element: <TableInlineEdit /> },
//       { path: 'example', element: <Navigate to="/example/list"/> },
//       { path: 'example/list', element: <ExampleList /> },
//       { path: 'example/create', element: <ExampleCreate /> },
//       { path: 'example/edit/:id(\\d+)', element: <ExampleEdit /> },
//       { path: 'error', element: <Navigate to="/error/404"/> },
//       { path: 'error/404', element: <V404 /> },
//       { path: 'error/401', element: <V401 /> },
//       { path: 'error-log', element: <ErrorLog /> },
//     ]
//   },
//   { path: '*', element: <Navigate to="404"/> },
// ]