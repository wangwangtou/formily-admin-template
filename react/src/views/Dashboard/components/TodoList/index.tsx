import React, { useState, useEffect } from 'react'

import { Todo } from './todo'

import './style.less'

const STORAGE_KEY = 'todos'
const filters = {
  all: todos => todos,
  active: todos => todos.filter(todo => !todo.done),
  completed: todos => todos.filter(todo => todo.done)
}
const defalutList = [
  { text: 'star this repository', done: false },
  { text: 'fork this repository', done: false },
  { text: 'follow author', done: false },
  { text: 'vue-element-admin', done: true },
  { text: 'vue', done: true },
  { text: 'element-ui', done: true },
  { text: 'axios', done: true },
  { text: 'webpack', done: true }
]

const pluralize = (n, w) => n === 1 ? w : w + 's'
const capitalize = s => s.charAt(0).toUpperCase() + s.slice(1)

export const TodoList: React.FunctionComponent = () => {
  const [todos, setTodos] = useState([])
  useEffect(() => {
    const queryData = async () => {
      setTodos(defalutList)
    }
    queryData()
  }, [])
  const getRemaining = (todos) => {
    return todos.filter(todo => !todo.done).length
  }
  const [remaining, setRemaining] = useState(getRemaining(todos))
  useEffect(() => {
    setRemaining(getRemaining(todos))
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])
  const [filteredTodos, setFilteredTodos] = useState([])
  const [visibility, setVisibility] = useState('all')
  useEffect(() => {
    setFilteredTodos(filters[visibility] ? filters[visibility](todos) : todos)
  }, [todos, visibility])
  const [allChecked, setAllChecked] = useState(false)
  return (
    <section className="todoapp">
      <header className="header">
        <input className="new-todo" autoComplete="off" placeholder="Todo List" onKeyUp={evt => {
          if (evt.key == 'Enter') {
            if (evt.target.value.trim()) {
              const newTodos = [].concat(todos, [{
                text: evt.target.value,
                done: false
              }])
              setTodos(newTodos)
            }
            evt.target.value = ''
          }
        }} />
      </header>
      { todos.length ?
      <>
        <section className="main">
          <input id="toggle-all" checked={allChecked} className="toggle-all" type="checkbox" onChange={(event) => {
            const checked = event.target.checked
            todos.forEach(todo => todo.done = checked)
            setTodos(todos.slice())
            setAllChecked(checked)
          }}/>
          <label htmlFor="toggle-all" />
          <ul className="todo-list">
            {
              filteredTodos.map(todo => (
                <Todo
                  todo={todo}
                  onToggleTodo={(todo) => {
                    todo.done = !todo.done
                    setTodos(todos.slice())
                  }}
                  onEditTodo={(todo, value) => {
                    todo.text = value
                    setTodos(todos.slice())
                  }}
                  onDeleteTodo={(todo) => {
                    const cy = todos.slice()
                    const idx = todos.indexOf(todo)
                    cy.splice(idx, 1)
                    setTodos(cy)
                  }}
                />
              ))
            }
          </ul>
        </section>
        <footer className="footer">
          <span className="todo-count">
            <strong>{ remaining }</strong> { pluralize(remaining, 'item') } left
          </span>
          <ul className="filters">
            {
              Object.keys(filters).map(key => (
                <li>
                  <a className={visibility === key ? 'selected' : ''} onClick={evt => {
                    setVisibility(key)
                    evt.preventDefault()
                  }}>
                    { capitalize(key) }
                  </a>
                </li>
              ))
            }
          </ul>
        </footer>
      </>
      : <></>}
    </section>
  )
}