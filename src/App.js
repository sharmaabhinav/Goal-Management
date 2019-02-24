import React, { Component } from 'react';
import './App.css';
import {Header, Confirm} from 'semantic-ui-react'
import List from './components/List'
import Footer from './components/Footer'
import Message from './components/Message'
import Api from './api/api'
import ENDPOINTS from './api/endpoints'


class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      goals: [],
      showConfirm: false,
      CurrentItemId: null,
      showMessage: false,
      message: '',
      messageHeader: ''
    }
    this.id = 1
  }

  onItemChange = (id, values) => {
    const {state: {goals}} = this
    const {name, value} = values
    const itemIndex = goals.findIndex((goal) => goal.id === id)
    const item = goals[itemIndex]
    const newGoals = [...goals.slice(0, itemIndex), {...item, [name]: value}, ...goals.slice(itemIndex + 1)]
    this.setState({ goals: newGoals })
  }

  onSave = () => {
    Api.post(ENDPOINTS.GoalEndPoint, this.state.goals).then((response) => {
      this.showNotfication(response.message, 2000)
    })
  }

  showNotfication (message, timeout = 3000) {
    this.setState({
      showMessage: true,
      message,
      messageHeader: 'Success!!'
    })
    setTimeout(() => {
      this.setState({
        showMessage: false
      })
    }, timeout)
  }

  onAdd = () => {
    this.setState({
      goals: [...this.state.goals, {id: this.id++, title: '', description: ''}]
    })
  }

  onItemDeleteCancel = () => {
    this.setState({showConfirm: false, CurrentItemId: null})
  }

  onItemDeleteConfirm = () => {
    this.setState({showConfirm: false})
    const {CurrentItemId} = this.state
    Api.delete(ENDPOINTS.GoalEndPoint).then((response) => {
      this.showNotfication(response.message, 2000)
      const {goals} = this.state
      const itemIndex = goals.findIndex((goal) => goal.id === CurrentItemId)
      const newGoals = [...goals.slice(0, itemIndex), ...goals.slice(itemIndex + 1)]
      this.setState({ goals: newGoals })
    })
  }

  onItemDeleteAction = (id) => {
    this.setState({showConfirm: true})
    this.setState({CurrentItemId: id})
  }

  componentDidMount () {
    Api.get(ENDPOINTS.GoalEndPoint).then((response) => {
      this.setState({
        goals: response.data.map((item) => ({...item, id: this.id++}))
      })
    })
  }
  render() {
    const {showMessage, goals, showConfirm, message, messageHeader} = this.state
    return (
      <React.Fragment>
        <Message duration={1000} header={messageHeader} message={message} visible={showMessage} />
        <div className='app'>
          <Header as='h1' textAlign='center' attached='top' color='blue'>Your Goals</Header>
          <List items={goals} onItemChange={this.onItemChange} onItemDelete={this.onItemDeleteAction} />
          <Footer onSave={this.onSave} onAdd={this.onAdd} />
          <Confirm
            open={showConfirm}
            onCancel={this.onItemDeleteCancel}
            onConfirm={this.onItemDeleteConfirm}
            size={'mini'}
            content={'Do you really want to delete this goal ?'}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
