import React, { Component } from 'react'
import { createUsername } from '../actions/chat.js'
import '../styles/Signin.css'



class Signin extends Component {
    state = {
        username: ''
    }
    handleSubmit = e => {
        e.preventDefault()
        createUsername(this.state.username).then(() => {
            this.props.history.push('/main')
        })
      }

    handleChange= e => {
        this.setState({
            [e.target.name]: e.target.value 
        })
    }
      
    render() {
        return (
            
        <div id="signin">
            <div id="signbox">
                <h1>functino chat</h1>
                <form autoComplete="off" onSubmit={this.handleSubmit}>
                <input type="text" name="username" value={this.state.username} onChange={this.handleChange} placeholder="enter a username"/>
                <button type="submit">Sign In</button>
            </form>
            </div>
        </div>
            
        )
    }
}


export default Signin 