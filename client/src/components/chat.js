import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom' 
import { addMessage, leaveRoom, joinRoom } from '../actions/chat.js'
import { withAuth } from '../lib/auth'
import '../styles/chat.css'
import 'font-awesome/css/font-awesome.css'
import moment from 'moment'


class Home extends Component {
  state = {
    message: '',
    bold: '',
    italic: '',
    underline: ''


  }
  
  // componentDidMount(){
  //   if(!this.props.username) {
  //     this.props.history.push('/')
  //   }
  // }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    addMessage({
      message: this.state.message,
      roomname: this.props.match.params.roomname,
      timestamp: moment().format(),
      bold: this.state.bold,
      italic: this.state.italic,
      underline: this.state.underline
    })
    this.setState({
      message:'',
      bold: '',
      italic: '',
      underline: ''
    })

  }

  signOut = e => {
    e.preventDefault()
    this.props.signout().then(() => {
      this.props.history.push('/main')
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

  changeBold = e => {
    e.preventDefault()
    if(this.state.bold !== 'bold'){
      this.setState({
        bold: 'bold'
      })
    } else {
      this.setState({
        bold: ''
      })
    }
  }

  changeItalic = e => {
    e.preventDefault()
    if(this.state.italic !== 'italic'){
      this.setState({
        italic: 'italic'
      })
    } else {
      this.setState({
        italic: ''
      })
    }
  }


  changeUnderline = e => {
    e.preventDefault()
    if(this.state.underline !== 'underline'){
      this.setState({
        underline: 'underline'
      })
    } else {
      this.setState({
        underline: ''
      })
    }
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
    console.log('messages', this.props.messages)
    return (
      <div id="mainContainer">
        <div className= "channelbox">
        
          <h3>[ Rooms ]</h3>
        
          <ul className="channels">
            {this.props.rooms.map((r,i) =>(
              <li key={"roomlist" + i}><Link to={'/' + r}>#{r}</Link></li>
            ))}
          </ul>

        
        </div>
       
        <div className="roomwrap">

          <div className="room" ref="chatroom">
        
            
            <form className="signoutbox" onSubmit={this.signOut}>
              <h2>[ ChatRoom: #{this.props.roomname} ] </h2>
              <button type="submit" id="signout"> Sign out </button>
            </form>
            
            <div className="buttonbox">
              <form className="leave" onSubmit={this.handleExit}>
                <button type="submit" id="lbutton">Leave<i className="fa fa-rocket"></i></button>
              </form>
              <form className="join" onSubmit={this.handleJoin}>
                <button type="submit" id="jbutton">Join<i className="fa fa-rocket"></i></button>
              </form>
             </div>
           
            
            {this.props.messages.map((m,i )=> (
              <p key= {"message" + i} className="messagebox">
                <span className="colorGreen">[ {m.username} ]</span>: 
                <span style={{fontWeight: m.bold, fontStyle: m.italic, textDecoration: m.underline}} className="message">{m.message}</span>
                <span className="timestamp ">[{moment(m.timestamp).fromNow()}]</span>
              </p>
            ))}
          
          </div>
        
          <button onClick={this.changeBold} className="fontbutton"><i className="fa fa-bold"></i></button>
          <button onClick={this.changeItalic} className="fontbutton"><i className="fa fa-italic"></i></button>
          <button onClick={this.changeUnderline} className="fontbutton"><i className="fa fa-underline"></i></button>
          


          <form className="chatbox" onSubmit={this.handleSubmit}>
             
            <input type="text" name="message" value={this.state.message} onChange={this.handleChange} autoComplete="off"/>
            <button type="submit" id="submitButton"><i className="fa fa-angle-up"></i></button>
        
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

export default withAuth(connect(mapStateToProps)(Home))