import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom' 
import '../styles/chat.css'
import store from '../store'
import { Authentication, AuthRoute } from '../lib/auth'

import Signin from './Signin'
import Chat from './chat'
import Roomlist from './Roomlist'



class App extends Component {

  render() {
    return (
      <Authentication redirectUrl="/">
        <Provider store={store}>
          <Router>  
            <div>
                        
              <ul className = "navlinks">

                <li><Link to="/">Sign In</Link></li>
                <li><Link to="/main">Main</Link></li>
                <li><Link to="/random">Random</Link></li>
                <li> <Link to="/createRoom">Create/Join a room</Link></li>
              </ul>
              <Switch>
                <AuthRoute path="/:roomname"  component={Chat} /> 
                <Route exact path="/" component={Signin}/>
                <Route path="/createRoom"  component={Roomlist}/>
                
              </Switch>
            </div>
          </Router>
        </Provider>
      </Authentication>
    )
  } 
}

export default App
