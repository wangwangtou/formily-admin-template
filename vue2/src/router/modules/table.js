/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const tableRouter = {
  path: '/table',
  component: Layout,
  redirect: '/table/complex-table',
  name: 'Table',
  meta: {
    title: 'Table',
    icon: 'table'
  },
  children: [
    {
      path: 'dynamic-table',
      components: {
        default: () => import('@/views/table/dynamic-table/index'),
        formily: () => import('@/views_f/table/dynamic-table/index')
      },
      name: 'DynamicTable',
      meta: { title: 'Dynamic Table' }
    },
    {
      path: 'drag-table',
      components: {
        default: () => import('@/views/table/drag-table'),
        formily: () => import('@/views_f/table/drag-table')
      },
      name: 'DragTable',
      meta: { title: 'Drag Table' }
    },
    {
      path: 'inline-edit-table',
      components: {
        default: () => import('@/views/table/inline-edit-table'),
        formily: () => import('@/views_f/table/inline-edit-table')
      },
      name: 'InlineEditTable',
      meta: { title: 'Inline Edit' }
    },
    {
      path: 'complex-table',
      components: {
        default: () => import('@/views/table/complex-table'),
        formily: () => import('@/views_f/table/complex-table')
      },
      name: 'ComplexTable',
      meta: { title: 'Complex Table' }
    }
  ]
}
export default tableRouter
