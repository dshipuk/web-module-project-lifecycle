import React from 'react'

export default class Form extends React.Component {
  render() {
    return (
      <>
        <form id="todoForm" onSubmit={this.props.onTodoFormSubmit}>
        <input 
          onChange={this.props.handleChanges}
          value={this.props.toDoNameInput} 
          type="text"
          placeholder="Type todo">
          </input>
        <input type="submit"></input>
        </form>
        <button 
        onClick={this.props.clearCompleted}
        >
          {this.props.displayCompleted ? "Hide" : "Show"} Completed
        </button>
      </>
    )
  }
}
