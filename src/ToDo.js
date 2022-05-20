import React from 'react'
import './index.css';

function ToDo({ todo, toggleTask }) {
    return (
        
        <div key={todo.id} className="task-todo">
            <div 
                className={todo.complete ? "task-text strike" : "task-text"}
                onClick={() => toggleTask(todo.id)}
                >
                {todo.task}
            </div>
            
        </div>
    )
}

export default ToDo