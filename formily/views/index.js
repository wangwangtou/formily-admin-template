import Dashboard from './dashboard'
import ExampleList from './example/list'
import ExampleCreate from './example/create'
import ExampleEdit from './example/edit'
import Login from './login/index'
import TableComplexTable, { add as TableComplexTableAdd, edit as TableComplexTableEdit } from './table/complex-table'
import TableDragTable from './table/drag-table'
import TableDynamicTable from './table/dynamic-table'
import TableInlineEditTable from './table/inline-edit-table'

export const Store = {
  Dashboard,
  ExampleList,
  ExampleCreate,
  ExampleEdit,
  Login,
  TableComplexTable,
  TableComplexTableAdd,
  TableComplexTableEdit,
  TableDragTable,
  TableDynamicTable,
  TableInlineEditTable,

  save(name, data) {
    Store[name] = data
  }
}

export {
  Dashboard,
  ExampleList,
  ExampleCreate,
  ExampleEdit,
  Login,
  TableComplexTable,
  TableComplexTableAdd,
  TableComplexTableEdit,
  TableDragTable,
  TableDynamicTable,
  TableInlineEditTable
}
