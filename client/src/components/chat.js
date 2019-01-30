import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom' 
import { addMessage, leaveRoom, joinRoom } from '../actions/chat.js'
import '../styles/chat.css'
import 'font-awesome/css/font-awesome.css'


class Home extends Component {
  state = {
    message: ''
  }
  componentDidMount(){
    if(!this.props.username) {
      this.props.history.push('/')
      alert('Create a username')
    }
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    addMessage({
      message: this.state.message,
      roomname: this.props.match.params.roomname
    })
    this.setState({
      message:''
    })

  }

  handleExit = e => {
    e.preventDefault()
    leaveRoom(this.props.roomname)
    alert('You have left this room')
  }

  handleJoin = e => {
    e.preventDefault()
    joinRoom(this.props.roomname)
    alert(`You're back in!`)
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
        <div className= "channelbox">
        
          <h3>[ Rooms ]</h3>
        
          <ul className="channels">
            {this.props.rooms.map((r,i) =>(
              <li key={"roomlist" + i}><Link to={'/' + r}>{r}</Link></li>
            ))}
          </ul>
        
        </div>
       
        <div className="roomwrap">

          <div className="room" ref="chatroom">
        
            <h2>[ ChatRoom ]</h2>
            
            <div className="buttonbox">
              <form className="leave" onSubmit={this.handleExit}>
                <button type="submit">Leave<i class="fa fa-rocket"></i></button>
              </form>
              <form className="join" onSubmit={this.handleJoin}>
                <button type="submit">Join<i class="fa fa-rocket"></i></button>
              </form>
            </div>
           
            
            {this.props.messages.map((m,i )=> (
              <p key= {"message" + i}><span>{m.username}</span>: {m.message}</p>
            ))}
          
          </div>
        
          <form className="chatbox" onSubmit={this.handleSubmit}>
        
            <input type="text" name="message" value={this.state.message} onChange={this.handleChange} autoComplete="off"/>
            <button type="submit"><i className="fa fa-angle-up"></i></button>
        
         </form>

        </div>
        
       
      </div>
    ) 
  }
}

function mapStateToProps(appState, ownProps) {
  const roomname = ownProps.match.params.roomname
  return {
    username: appState.chatReducer.username,
    messages: appState.chatReducer.messages.filter(m => m.roomname === roomname),
    history: ownProps.history,
    rooms: appState.chatReducer.rooms,
    roomname: roomname
  }
}

export default connect(mapStateToProps)(Home)