import TodoInput from "./component/TodoInput"
import TodoList from "./component/TodoList"
import { useState, useEffect } from "react"

function App() {
  
  const [todos, setTodos] = useState([])
  const [todoValue, setTodoValue] = useState('')
  const [message, setMessage] = useState('Type your to-dos on top to begin..')

  function persistData(newList) {
    localStorage.setItem('todos', JSON.stringify({todos: newList}))
  }

  function handleAddTodos(newTodo) {
    const newTodoList = [...todos, newTodo]
    persistData(newTodoList)
    setTodos(newTodoList)
  }

  function handleDeleteTodo(index) {
    const newTodoList = todos.filter((todo, todoIndex) => {
      return todoIndex !== index
    })
    persistData(newTodoList)
    setTodos(newTodoList)
  }
  function handleEditTodo(index) {
    const valueToBeEdited = todos[index]
    setTodoValue(valueToBeEdited)
    handleDeleteTodo(index)
  }

  useEffect(() => {
    if(!localStorage) {
      return
    }
    let localTodos = localStorage.getItem('todos')
    if (!localTodos) {
      return
    }
    localTodos = JSON.parse(localTodos).todos
    setTodos(localTodos)
  }, [])

  useEffect(() => {
    if(todos.length === 0) {
      setMessage('Type your to-dos on top to begin..')
    } else if(todos.length === 1) {
      setMessage('Great, what else?')
    } else if(todos.length === 2) {
      setMessage('Your sure you gon do that..?')
    } else if(todos.length === 3) {
      setMessage('aight, keep goin')
    } else if(todos.length > 3 && todos.length < 6) {
      setMessage('you do you, keep grindin!')
    } else if(todos.length > 6) {
      setMessage('ok, you are planning way too much, get some rest')
    }
  }, [todos.length])
  
  return (
    <>
       <TodoInput todoValue={todoValue} setTodoValue={setTodoValue} handleAddTodos={handleAddTodos}/>
       <TodoList handleEditTodo={handleEditTodo} handleDeleteTodo={handleDeleteTodo} todos={todos}/>
       <h1>{todos.length > 0
            ? ""
            : "Not your Average To-Do List"}
        </h1>
       
       <h3>{message}</h3>
    </>
  )
}

export default App
