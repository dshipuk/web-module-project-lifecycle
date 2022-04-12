import React from 'react'
import axios from 'axios'
import Form from "./Form"
import TodoList from './TodoList'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
    todos: [],
    error: '',
    toDoNameInput: '',
    displayCompleted: true
  }
  
  handleChanges = event => {
    const { value } = event.target;
    this.setState({
      ...this.state,
      toDoNameInput: value
    })
  }

  fetchAllTodos = () => {
    axios.get(URL)
      .then(res => {
        console.log(res.data)
        this.setState({
          ...this.state,
          todos: res.data.data
        })
      })
      .catch(this.setAxiosResponseError);
  }

  resetForm = () => this.setState({
    ...this.state,
    toDoNameInput: ""
  })

  setAxiosResponseError = err => this.setState({ ...this.state, error: err.response.data.message})

  postNewTodo = () => {
    axios.post(URL, { name: this.state.toDoNameInput })
      .then(res => {
        console.log(res)
        
        this.setState({ ...this.state, todos: this.state.todos.concat(res.data.data) })

        this.resetForm()
      })
      .catch(this.setAxiosResponseError)
  }

  toggleCompleted = id => () => {
    axios.patch(`${URL}/${id}`)
      .then(res => {
        console.log(res)
        this.setState({ ...this.state, todos: this.state.todos.map(td => {
          if(td.id !== id) return td
          return res.data.data
        })})
      })
      .catch(this.setAxiosResponseError)
  }

  componentDidMount() {
    // Fetch all todos from server
    this.fetchAllTodos();
  }

  onTodoFormSubmit = event => {
    event.preventDefault();
    this.postNewTodo()
  }

  clearCompleted = () => {
    this.setState({
      ...this.state,
      displayCompleted: !this.state.displayCompleted
    })
  }



  render() {
    return(
      <div>
        <div id="error">Error: { this.state.error }</div>
        <TodoList 
          todos={this.state.todos}
          displayCompleted={this.state.displayCompleted}
          toggleCompleted={this.toggleCompleted}
        />
        <Form 
          onTodoFormSubmit={this.onTodoFormSubmit}
          handleChanges={this.handleChanges}
          toDoNameInput={this.state.toDoNameInput}
          clearCompleted={this.clearCompleted}
          displayCompleted={this.state.displayCompleted}
        />
      </div>
    )
  }
}
