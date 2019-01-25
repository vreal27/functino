import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addMessage } from '../actions/chat.js'
import '../styles/chat.css'
import 'font-awesome/css/font-awesome.css'


class Home extends Component {
  state = {
    message: ''
  }
  
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    addMessage(this.state.message)
    this.setState({
      message: ''
    })

  }

  componentWillUpdate() {
    var node = this.refs.chatroom
    this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight
  }

  componentDidUpdate() {
    if (this.shouldScrollBottom) {
      var node = this.refs.chatroom
      node.scrollTop = node.scrollHeight
    }
  }

  render() {
    return (
      <div id="mainContainer">
       
        <div id="test">
         <h1>Functino</h1>
        </div>

        <div className="roomwrap">
        
          <div id="room" ref="chatroom">
            <h2>ChatRoom</h2>
            {this.props.messages.map((m,i )=> (
              <p key= {"message" + i}><span>{m.username}</span>: {m.message}</p>
            ))}
          </div>
          <form id="chatbox" onSubmit={this.handleSubmit}>
            <input type="text" name="message" value={this.state.message} onChange={this.handleChange} autoComplete="off"/>
            <button type="submit"><i class="fa fa-angle-up"></i></button>
         </form>

        </div>
       
        
       
      </div>
    )
  }
}

function mapStateToProps(appState) {
  // console.log('mapstate', appState.chatReducer.messages)
  return {
    messages: appState.chatReducer.messages
  }
}

export default connect(mapStateToProps)(Home)