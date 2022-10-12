import React, { useState, useEffect, useRef } from 'react'

interface TodoData {
  text: string,
  done: boolean,
}

interface TodoProps {
  todo: TodoData,
  onToggleTodo: (todo: TodoData) => void,
  onEditTodo: (todo: TodoData, value: string) => void,
  onDeleteTodo: (todo: TodoData) => void
}

export const Todo: React.FunctionComponent<TodoProps> = ({
  todo,
  onToggleTodo,
  onEditTodo,
  onDeleteTodo,
}) => {
  const editRef = useRef(null)
  const [editing, setEditing] = useState(false)
  useEffect(() => {
    editing && editRef.current && editRef.current.focus()
  }, [editing])
  const [text, setText] = useState(todo.text)
  const doneEdit = (evt) => {
    const val = evt.target.value.trim()
    if (!val) {
      onDeleteTodo && onDeleteTodo(todo)
    } else if (editing) {
      onEditTodo && onEditTodo(todo, val)
      setEditing(false)
    }
  }
  return (
    <li className={ (todo.done ? 'completed' : '') + ' ' + (editing ? 'editing' : '') }>
      <div className="view">
        <input
          checked={todo.done}
          className="toggle"
          type="checkbox"
          onChange={evt => {
            onToggleTodo && onToggleTodo(todo)
          }}
        />
        <label onDoubleClick={() => setEditing(true)}>{todo.text}</label>
        <button className="destroy" onClick={evt => {
          onDeleteTodo && onDeleteTodo(todo)
        }} />
      </div>
      { editing ? <input
        ref={editRef}
        value={text}
        onChange={evt => setText(evt.target.value)}
        className="edit"
        onKeyUp={evt => {
          if (evt.key == 'Enter') {
            doneEdit(evt)
          } else if (evt.key == 'Escape') {
            setText(todo.text)
            setEditing(false)
          }
        }}
        onBlur={evt => doneEdit(evt)}
      /> : <></> }
    </li>
  )
}