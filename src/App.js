import React, { useState } from 'react'
import ToDo from './ToDo'
import ToDoForm from './form'
import { clear } from '@testing-library/user-event/dist/clear'

function App() {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('storage')) || [])

  const addTask = (userInput) => {
    
    if(userInput) {
      const newItem = {
        id: todos.length+1,
        task: userInput,
        complete: false
      }
      setTodos([...todos, newItem])
    }
    localStorage.setItem('storage', JSON.stringify(todos))
  }
  const handleClear = () => {
    localStorage.clear('storage')
    setTodos([clear])
  };
  const handleFilter = () => {
    let filtered = todos.filter((task) => {
      return !task.complete;
    });
    setTodos(filtered);
  };
  const ToDoList = ({ handleFilter, handleClear}) => {
    return (
        <div>
        
            <button style={{margin: '20px'}} onClick={handleFilter}>Clear done tasks</button>
            <button style={{margin: '20px'}} onClick={handleClear}>Clear all tasks</button>
        </div>
    );
 };

  const handleToggle = (id) => {
    setTodos([
      ...todos.map((todo) => 
        todo.id === id ? { ...todo, complete: !todo.complete } : {...todo }
      )
    ])
    
  }
  
  return (
    <div className="App">
      <header>
        <h1>To Do List:</h1>
      </header>
      <ToDoForm addTask={addTask}
/>

      {todos.map((todo) => {
        return (
          <ToDo
            todo={todo}
            key={todo.id}
            toggleTask={handleToggle}
            
            />
        )
      })}
      <ToDoList handleFilter={handleFilter} handleToggle={handleToggle} handleClear={handleClear}/>
    </div>
  );
}

export default App;

