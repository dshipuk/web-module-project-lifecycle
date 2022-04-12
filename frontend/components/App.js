import React from 'react'
import axios from 'axios'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
    todos: [],

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
      .catch(err => console.error(err));
  }

  componentDidMount() {
    // Fetch all todos from server
    this.fetchAllTodos();
  }



  render() {
    return(
      <div>
        <div id="error">Error: No error here</div>
        <div id="todos">
          <h2>Todos:</h2>
          {
            this.state.todos.map(td => {
              return <div key={td.id}>{td.name}</div>
            })
          }
        </div>
        <form id="todoForm">
          <input type="text" placeholder="Type todo"></input>
          <input type="submit"></input>
          <button>Clear Completed</button>
        </form>
      </div>
    )
  }
}
