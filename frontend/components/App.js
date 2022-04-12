import React from 'react'
import axios from 'axios'

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

  toggleCompleted = id => event => {
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
        <div id="todos">
          <h2>Todos:</h2>
          {
            this.state.todos.reduce((acc, td) => {
              if (this.state.displayCompleted || !td.completed) return acc.concat(<div onClick={this.toggleCompleted(td.id)} key={td.id}>{td.name} {td.completed ? "- Completed" : ""} </div>)
              return acc
              // return 
            }, [])
          }
        </div>
        <form id="todoForm" onSubmit={this.onTodoFormSubmit}>
          <input onChange={this.handleChanges} value={this.state.toDoNameInput} type="text" placeholder="Type todo"></input>
          <input type="submit"></input>
        </form>
        <button onClick={this.clearCompleted}>{this.state.displayCompleted ? "Hide" : "Show"} Completed</button>
      </div>
    )
  }
}
