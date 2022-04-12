import React from 'react'
import axios from 'axios'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
    todos: [],
    error: '',
    toDoNameInput: '',
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
        this.fetchAllTodos()
        this.resetForm()
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



  render() {
    return(
      <div>
        <div id="error">Error: { this.state.error }</div>
        <div id="todos">
          <h2>Todos:</h2>
          {
            this.state.todos.map(td => {
              return <div key={td.id}>{td.name}</div>
            })
          }
        </div>
        <form id="todoForm" onSubmit={this.onTodoFormSubmit}>
          <input onChange={this.handleChanges} value={this.state.toDoNameInput} type="text" placeholder="Type todo"></input>
          <input type="submit"></input>
          <button>Clear Completed</button>
        </form>
      </div>
    )
  }
}
