import TodoInput from "./component/TodoInput"
import TodoList from "./component/TodoList"
import { useState, useEffect } from "react"

function App() {
  
  const [todos, setTodos] = useState([])
  const [todoValue, setTodoValue] = useState('')

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
  
  return (
    <>
       <TodoInput todoValue={todoValue} setTodoValue={setTodoValue} handleAddTodos={handleAddTodos}/>
       <TodoList handleEditTodo={handleEditTodo} handleDeleteTodo={handleDeleteTodo} todos={todos}/>
       <h1>{todos.length > 0
            ? ""
            : "Not your Average To-Do List"}
        </h1>
       
       <h3>{todos.length > 0
          ? "Great, what else?"
          : "Type your to-dos on top to begin.."
        
        }</h3>
    </>
  )
}

export default App
