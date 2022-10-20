import React, { Suspense, lazy } from 'react'
import { Navigate, RouteObject } from 'react-router-dom'
import { Layout } from '@/layout'
// import {
//   AuthRedirect,
//   Designable,
//   Login,
//   V401,
//   V404,
//   Redirect,
//   Dashboard,
//   Profile,
//   TableComplex,
//   TableDynamic,
//   TableDrag,
//   TableInlineEdit,
//   ExampleList,
//   ExampleCreate,
//   ExampleEdit,
//   ErrorLog,
// } from '@/views'

const AuthRedirect = lazy(async () => ({ default: (await import('@/views/AuthRedirect/index')).AuthRedirect }))
const Designable = lazy(async () => ({ default: (await import('@/views/Designable/index')).Designable }))
const Login = lazy(async () => ({ default: (await import('@/views/Login/index')).Login }))
const V401 = lazy(async () => ({ default: (await import('@/views/V401/index')).V401 }))
const V404 = lazy(async () => ({ default: (await import('@/views/V404/index')).V404 }))
const Redirect = lazy(async () => ({ default: (await import('@/views/Redirect/index')).Redirect }))
const Dashboard = lazy(async () => ({ default: (await import('@/views/Dashboard/index')).Dashboard }))
const Profile = lazy(async () => ({ default: (await import('@/views/Profile/index')).Profile }))
const TableComplex = lazy(async () => ({ default: (await import('@/views/Table/index')).TableComplex }))
const TableDynamic = lazy(async () => ({ default: (await import('@/views/Table/index')).TableDynamic }))
const TableDrag = lazy(async () => ({ default: (await import('@/views/Table/index')).TableDrag }))
const TableInlineEdit = lazy(async () => ({ default: (await import('@/views/Table/index')).TableInlineEdit }))
const ExampleList = lazy(async () => ({ default: (await import('@/views/Example/index')).ExampleList }))
const ExampleCreate = lazy(async () => ({ default: (await import('@/views/Example/index')).ExampleCreate }))
const ExampleEdit = lazy(async () => ({ default: (await import('@/views/Example/index')).ExampleEdit }))
const ErrorLog = lazy(async () => ({ default: (await import('@/views/ErrorLog/index')).ErrorLog }))
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

const suspenseFallback = (children) => {
  return (
    <div className="suspense-fallback">{children}</div>
  )
}

export const constantRoutes: Route[] = [
  { path: '/redirect/', element: <Layout />, hidden: true,
    children: [
      { path: ':path(.*)', element: <Suspense fallback={ suspenseFallback('Redirect') }><Redirect /></Suspense> },
    ]
  },
  { path: '/login', element: <Suspense fallback={ suspenseFallback('Login') }><Login /></Suspense>, hidden: true },
  { path: '/auth-redirect', element: <Suspense fallback={ suspenseFallback('AuthRedirect') }><AuthRedirect /></Suspense>, hidden: true },
  { path: '/404', element: <Suspense fallback={ suspenseFallback('V404') }><V404 /></Suspense>, hidden: true },
  { path: '/401', element: <Suspense fallback={ suspenseFallback('V401') }><V401 /></Suspense>, hidden: true },
  { path: '/designable', element: <Suspense fallback={ suspenseFallback('Designable') }><Designable /></Suspense>, hidden: true },
  { path: '/', element: <Layout />, 
    children: [
      { path: '', element: <Navigate to={"/dashboard"} />, hidden: true },
      { path: 'dashboard', element: <Suspense fallback={ suspenseFallback('Dashboard') }><Dashboard /></Suspense>, name: 'Dashboard', meta: { title: 'Dashboard', icon: 'dashboard', affix: true } },
    ]
  },
  { path: '/profile', element: <Layout />, hidden: true,
    children: [
      { path: '', element: <Suspense fallback={ suspenseFallback('Profile') }><Profile /></Suspense>, name: 'Profile', meta: { title: 'Profile', icon: 'user', noCache: true } },
    ]
  },
]

export const asyncRoutes: Route[] = [
  { path: '/table/', element: <Layout />, name: 'Table', meta: { title: 'Table', icon: 'table' },
    children: [
      { path: '', element: <Navigate to="/table/complex-table"/>, hidden: true },
      { path: 'complex-table', element: <Suspense fallback={ suspenseFallback('TableComplex') }><TableComplex /></Suspense>, name: 'ComplexTable', meta: { title: 'Complex Table' } },
      { path: 'dynamic-table', element: <Suspense fallback={ suspenseFallback('TableDynamic') }><TableDynamic /></Suspense>, name: 'DynamicTable', meta: { title: 'Dynamic Table' } },
      { path: 'drag-table', element: <Suspense fallback={ suspenseFallback('TableDrag') }><TableDrag /></Suspense>, name: 'DragTable', meta: { title: 'Drag Table' } },
      { path: 'inline-edit-table', element: <Suspense fallback={ suspenseFallback('TableInlineEdit') }><TableInlineEdit /></Suspense>, name: 'InlineEditTable', meta: { title: 'Inline Edit Table' } },
    ]
  },
  { path: '/example/', element: <Layout />, name: 'Example', meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      { path: '', element: <Navigate to="/example/list"/>, hidden: true },
      { path: 'list', element: <Suspense fallback={ suspenseFallback('ExampleList') }><ExampleList /></Suspense>, name: 'ArticleList', meta: { title: 'Article List', icon: 'list' }},
      { path: 'create', element: <Suspense fallback={ suspenseFallback('ExampleCreate') }><ExampleCreate /></Suspense>, name: 'CreateArticle', meta: { title: 'Create Article', icon: 'edit' } },
      { path: 'edit/:id', element: <Suspense fallback={ suspenseFallback('ExampleEdit') }><ExampleEdit /></Suspense>, name: 'EditArticle', meta: { title: 'Edit Article', noCache: true, activeMenu: 'ArticleList' }, hidden: true },
    ]
  },
  { path: '/error/', element: <Layout />, name: 'ErrorPages', meta: { title: 'Error Pages', icon: '404' },
    children: [
      { path: '', element: <Navigate to="/error/404"/>, hidden: true },
      { path: '404', element: <Suspense fallback={ suspenseFallback('V404') }><V404 /></Suspense>, name: 'Page404', meta: { title: '404', noCache: true } },
      { path: '401', element: <Suspense fallback={ suspenseFallback('V401') }><V401 /></Suspense>, name: 'Page401', meta: { title: '401', noCache: true } },
    ]
  },
  { path: '/error-log', element: <Layout />,
    children: [
      { path: '', element: <Suspense fallback={ suspenseFallback('ErrorLog') }><ErrorLog /></Suspense>, name: 'ErrorLog', meta: { title: 'Error Log', icon: 'bug' } },
    ]
  },
  {
    path: 'external-link',
    element: <Layout />,
    children: [
      {
        path: 'https://github.com/wangwangtou/formily-admin-template',
        meta: { title: 'External Link', icon: 'link' }
      }
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