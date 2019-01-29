import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom' 
import '../styles/chat.css'
import store from '../store'

import Signin from './Signin'
import Chat from './chat'
import Roomlist from './Roomlist'

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router>  
          <div>
                      
            <ul className = "navlinks">

              <li><Link to="/">Sign In</Link></li>
              <li><Link to="/main">Main</Link></li>
              <li><Link to="/random">Random</Link></li>
              <li> <Link to="/createRoom">Create a room</Link></li>
            </ul>
            <Route exact path="/" component={Signin}/>
            <Route path="/createRoom" component={Roomlist}/>
            <Route path="/:roomname"  component={Chat} />
          </div>
        </Router>
      </Provider>
    )
  } 
}

export default App
