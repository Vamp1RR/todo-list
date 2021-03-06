import React, { useState, useEffect } from 'react';
import ToDo from './ToDo';
import ToDoForm from './form';
import './index.css';


function App() {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('storage')) || [])
  useEffect(() => {
    localStorage.setItem('storage', JSON.stringify(todos))
  })
  const addTask = (userInput) => {

    if (userInput) {
      const newItem = {
        id: todos.length + 1,
        task: userInput,
        complete: false
      }

      setTodos([...todos, newItem])
    }



  }
  const handleClear = () => {
    localStorage.clear('storage')
    setTodos([])
  };
  const handleFilter = () => {
    let filtered = todos.filter((task) => {
      return !task.complete;
    });
    setTodos(filtered);
  };
  const ToDoList = ({ handleFilter, handleClear }) => {
    return (
      <div>

        <button className='btn' onClick={handleFilter}>Clear done tasks</button>
        <button className='btn' onClick={handleClear}>Clear all tasks</button>
      </div>
    );
  };

  const handleToggle = (id) => {
    setTodos([
      ...todos.map((todo) =>
        todo.id === id ? { ...todo, complete: !todo.complete } : { ...todo }
      )
    ])

  }

  return (

    <div className="App">
      <header>
        <h1 className='header'>To Do List</h1>
      </header>
      <ToDoForm addTask={addTask}/>
      <div className='task-container'>
      
      

      {todos.map((todo) => {
        return (
          <ToDo
            todo={todo}
            key={todo.id}
            toggleTask={handleToggle}

          />
        )
      })}
      
      </div>
      <ToDoList handleFilter={handleFilter} handleToggle={handleToggle} handleClear={handleClear} />
    </div>
  );
}

export default App;

