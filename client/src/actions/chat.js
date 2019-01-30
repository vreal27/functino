import axios from 'axios'
import store from '../store'
import io from 'socket.io-client'

axios.defaults.baseURL = '/api'

const socket = io.connect('http://localhost:3001') 

// const socket = io.connect('http://192.168.0.123:3001')


export function addMessage(message) {
  const username = store.getState().chatReducer.username

  socket.emit('new message', {
    roomname: message.roomname,
    username: username,
    message: message.message
  })
}

export function createUsername(username) {
  var promise = new Promise((resolve, reject) => {
    store.dispatch({
      type: 'SIGN_IN',
      username: username
    })

    resolve()
  })

  return promise
}


export function addRoom(room) {
  socket.emit('new room', room)
}

export function leaveRoom(room) {
  socket.emit('leave room', room)
}

socket.on('new message', (message) => {
  store.dispatch({
    type: 'ADD_MESSAGE',
    message: message
  })
})

socket.on('channel list', (room) => {
  store.dispatch({
    type: 'CHANNEL_LIST',
    rooms: room
  })
})

socket.on('left room', (room) => {
  console.log('room', room.room)
  store.dispatch({
    type:'LEFT_ROOM',
    leave: room.room
  })
})

