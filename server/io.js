import socketio from 'socket.io'



export default function(server) {
  const io = socketio(server)

  const rooms = []
  
  io.on('connection', function(socket){
    socket.join('main')
    socket.join('random')
    socket.on('new message', (message) => {
      io.to(message.roomname).emit('new message', message)
    })

    socket.on('new room', (room) => {
      rooms.push(room)

      io.emit('channel list', rooms)

      if(rooms.includes(room)){
        socket.join(room)
        return socket.emit("Successfully joined room.")
      } else {
        return socket.emit('no room exists')
      }
    })


    console.log('User has connected to socket server')
  }) 
}