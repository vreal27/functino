import React, { Component} from 'react'
import { connect } from 'react-redux'
import { addRoom } from '../actions/chat.js'
import { Link } from 'react-router-dom' 
import "../styles/Roomlist.css"


class RoomList extends Component {
    state = {
        room: ''
    }

    handleSubmit= e => {
        e.preventDefault()
        addRoom(this.state.room)
        this.setState({
            room:''
          })
    }

    handleChange = e => {
        this.setState({
          [e.target.name]: e.target.value
        })
      }

    render() {
        return (
            <div id="listcontainer">
                <h1>[ New Channels ]</h1>
                <ul className="newroomlist">
                    {this.props.rooms.map((r, i) => {
                        console.log(r)
                        return <li key={"room" + i}><Link to={"/" + r.room}>{r.room}</Link></li>
                    })}
                </ul>
                <form className="roombox" onSubmit={this.handleSubmit}>
                    <input type="text" name="room" value={this.state.room} onChange={this.handleChange} autoComplete="off"/>
                    <button type="submit">submit</button>
                </form>

            </div>
        )
    }
}


function MapStateToProps(appState){
    return {
        rooms: appState.chatReducer.rooms
    }
}

export default connect(MapStateToProps)(RoomList)