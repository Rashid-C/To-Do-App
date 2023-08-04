import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FaTrash, FaEdit,FaFont } from 'react-icons/fa';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [editTask, setEditTask] = useState(null);
  const [notification, setNotification] = useState('');

  const handleTaskChange = (e) => {
    setTask(e.target.value);
  };

  const handleAddTodo = () => {
    if (task.trim() !== '') {
      const newTodo = {
        id: uuidv4(),
        task: task,
        completed: false
      };
      setTodos([...todos, newTodo]);
      setTask('');
    }
  };

  const handleToggleComplete = (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this todo?');
    if (confirmed) {
      const updatedTodos = todos.filter(todo => todo.id !== id);
      setTodos(updatedTodos);
    }
  };

  const handleEditTodo = (id) => {
    const todo = todos.find(todo => todo.id === id);
    setEditTask(todo);
    setTask(todo.task);
  };

  const handleUpdateTodo = () => {
    if (editTask && task.trim() !== '') {
      const updatedTodos = todos.map(todo =>
        todo.id === editTask.id ? { ...todo, task: task } : todo
      );
      setTodos(updatedTodos);
      setEditTask(null);
      setTask('');
      setNotification('Task updated successfully');
      setTimeout(() => {
        setNotification('');
      }, 2000);
    }
  };

  return (
    <div className="todo-list">
      <h1>Todo List</h1>
      <div className="add-todo">
        <input
          type="text"
          value={task}
          placeholder="Enter a task..."
          onChange={handleTaskChange}
        />
        {editTask ? (
          <button className="icon-button" onClick={handleUpdateTodo}>
            <FaEdit />
          </button>
        ) : (
          <button className="icon-button" onClick={handleAddTodo}>
            <FaFont />
          </button>
        )}
      </div>
      <p className="task-count">{todos.length} tasks</p>
      <ul className="todos">
        {todos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <span onClick={() => handleToggleComplete(todo.id)}>{todo.task}</span>
            <button className="icon-button" onClick={() => handleDeleteTodo(todo.id)}>
              <FaTrash />
            </button>
            <button className="icon-button" onClick={() => handleEditTodo(todo.id)}>
              <FaEdit />
            </button>
          </li>
        ))}
      </ul>
      {notification && <p className="notification">{notification}</p>}
      <div className="footer">
        <span>Created by RASHID C</span>
      </div>
    </div>
  );
};

export default TodoList;
