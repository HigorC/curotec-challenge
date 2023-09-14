"use client";

import styles from "./page.module.css"
import { useState, useEffect } from 'react'
import { FaTrash } from 'react-icons/fa';
import { getAllUsers, createUser, createTodo, removeTodo, updateTodo } from "./services/api.service";

export default function Home() {
  const [selectedEmail, setSelectedEmail] = useState('');
  const [selectedUser, setSelectedUser] = useState();
  const [users, setUsers] = useState([]);
  const [userTodos, setUserTodos] = useState([]);
  const [email, setEmail] = useState("");
  const [newTodo, setNewTodo] = useState("");

  //filter
  const [filter, setFilter] = useState("");
  const [completedFilter, setCompletedFilter] = useState("all");

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
    updateUsers()
  }, [])

  const updateUsers = () => {
    getAllUsers().then(json => {
      setUsers(json)
    })
  }

  const handleUserChange = (event) => {
    updateUsers()
    const selectedEmail = event.target.value;
    setSelectedEmail(selectedEmail);

    const selectedUser = users.find(user => user.email === selectedEmail);
    setSelectedUser(selectedUser)
    setUserTodos(selectedUser.todos);
  };

  const handleUserCreation = (event) => {
    createUser(email).then((res) => {
      updateUsers()
    }).catch(err => {
      console.error(err);
    })
  }

  const handleTodoCreation = (event) => {
    createTodo(selectedUser._id, newTodo).then((res) => {
      setUserTodos(res.user.todos)
    }).catch(err => {
      console.error(err);
    })
  }

  const handleTodoRemove = (todoId) => {
    removeTodo(selectedUser._id, todoId).then((res) => {
      setUserTodos(res.user.todos)
    }).catch(err => {
      console.error(err);
    })
  }

  const handleTodoUpdate = (todoId, title, done) => {
    updateTodo(selectedUser._id, todoId, title, done).then((res) => {
      setUserTodos(res.user.todos)
    }).catch(err => {
      console.error(err);
    })
  }

  const getTodoInputClass = (done) => {
    let todoClass = "form-control input-group-text "

    if (done) {
      todoClass += "text-bg-success text-decoration-line-through"
    }
    return todoClass
  }

  const handleCompletedFilter = (event) => {
    setCompletedFilter(event.target.value)
  }

  const getFilteredTodos = () => {
    return userTodos.reduce((todosResult, todo) => {
      let includeTodo = true
      if (!todo.title.includes(filter)) {
        includeTodo = false
      }

      if (todo.done === true && completedFilter === "incompleted") {
        includeTodo = false
      }

      if (todo.done === false && completedFilter === "completed") {
        includeTodo = false
      }

      if (includeTodo) {
        todosResult.push(todo)
      }

      return todosResult
    }, [])
  }

  return (
    <div className='container mt-5'>
      <section className={styles.userSection}>

        <h3>Create a new user</h3>
        <div className="input-group mb-3">
          <input value={email} onChange={e => setEmail(e.target.value)} type="text" className="form-control" placeholder="Your email" aria-label="Example text with button addon" aria-describedby="button-addon1" />
          <button onClick={handleUserCreation} className="btn btn-secondary" type="button" id="button-addon1">Create new user</button>
        </div>

        <h3>Select a user</h3>
        <select name="Users" className="form-control" value={selectedEmail} onChange={handleUserChange}>
          {users && users.map(user => {
            return (<option key={user._id} value={user.email}>{user.email}</option>)
          })}
        </select>

      </section>
      {selectedEmail && (
        <div>
          <h2>Tasks</h2>
          <div className="input-group mb-5">
            <input value={newTodo} onChange={e => setNewTodo(e.target.value)} placeholder="Task title" type="text" className="form-control" />
            <button onClick={handleTodoCreation} className="btn btn-secondary" type="button" id="button-addon1">Create new task</button>
          </div>
          <div className="mb-3 text-center">
            <b >Created tasks in user [{selectedEmail}]</b>
          </div>

          {/* Filter */}
          <div className="mb-3">
            <div className="row">
              <div className="col">
                <input type="text" placeholder="Filter by title" className="form-control" value={filter} onChange={e => setFilter(e.target.value)} />
              </div>
              <div className="col">
                <select className="form-control" value={completedFilter} onChange={handleCompletedFilter}>
                  <option value="all">All</option>
                  <option value="completed">Completed</option>
                  <option value="incompleted">Incompleted</option>
                </select>
              </div>
            </div>
          </div>

          {userTodos && getFilteredTodos().map(todo => (
            <div className="input-group mb-3">
              <div className="input-group-text">
                <input onClick={() => handleTodoUpdate(todo._id, todo.title, !todo.done)} className="form-check-input mt-0" type="checkbox" value={todo.done} checked={todo.done} />
              </div>
              <span className={getTodoInputClass(todo.done)} id="basic-addon3">{todo.title}</span>
              <button onClick={() => handleTodoRemove(todo._id)} className="btn btn-danger" type="button">
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
// erubiel@curotec.com