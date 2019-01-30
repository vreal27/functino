import socketio from 'socket.io'



export default function(server) {
  const io = socketio(server)

  
  io.on('connection', function(socket){
    socket.join('main')
    socket.join('random')
    socket.on('new message', (message) => {
      io.to(message.roomname).emit('new message', message)
      
    })
    // creates a room
    socket.on('new room', (room) => {
   
      socket.join(room)
      
      socket.emit('channel list', room)

     

    })
    // leave current room
    socket.on('leave room', (room) => {
     
      socket.leave(room)
      socket.emit('left room', room)

      
    })
    
    // re-join room
    socket.on('re-join room', (room) => {
      socket.join(room)
      socket.emit('re-joined room', room)
    })

    console.log('User has connected to socket server')
  }) 
}