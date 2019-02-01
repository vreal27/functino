import React, { Component } from 'react'
// import { createUsername } from '../actions/chat.js'
import { withAuth } from '../lib/auth' 
import { resgisterUser, registerUser} from '../actions/chat' 
import '../styles/Signin.css'



class Signin extends Component {
    state = {
        username: '',
        password: ''
    }
    handleSubmit = e => {
        e.preventDefault()
        // createUsername(this.state.username).then(() => {
        //     this.props.history.push('/main')
        // })

        this.props.signin(this.state.username, this.state.password).then(() => {
            this.props.history.push('/main')
        }) 
      }

    handleChange= e => {
        this.setState({
            [e.target.name]: e.target.value 
        })
    }


    createUser = e => {
        e.preventDefault()
        registerUser(this.state.username, this.state.password)
        this.props.history.push('/main')

    }
      
    render() {
        return (
        <div id="joinbox">
            <div id="signin">
                <div id="signbox">
                    <h1>functino chat</h1>
                    <form autoComplete="off" onSubmit={this.handleSubmit} className="inputbox">

                    <input type="text" name="username" value={this.state.username} onChange={this.handleChange} placeholder="enter a username"/>

                    <input
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        placeholder="enter a password"
                    />

                    <button type="submit">Sign In</button>
                </form>
                <form autoComplete="off" onSubmit={this.createUser} className="inputbox">

                    <button type="submit">Click to create user/password</button>
                </form>
                </div>
            </div>

            
        </div>
   
            
        )
    }
}


export default withAuth(Signin)