import socketio from 'socket.io'

import app from './app'
import { PORT as port } from '../config'
import { connectDB, logger } from './utils'

const setupServer = async () => {
  await connectDB()

  const server = app.listen(port, () => logger.info(`server running on http://localhost:${port}`))

  const io = new socketio.Server(server, {
    pingTimeout: 60000,
    cors: {
      origin: 'http://localhost:5173'
    }
  })

  io.on('connection', (socket) => {
    console.log('connected to socket.io')

    // connect to personal socket
    socket.on('setup', (userData) => {
      socket.join(userData._id)
      socket.emit('connected')
    })

    socket.on('join chat', (room) => {
      socket.join(room)
      console.log(`user joined room: ${room}`)
    })

    socket.on('typing', (room) => socket.in(room).emit('typing'))

    socket.on('stop typing', (room) => socket.in(room).emit('stop typing'))

    socket.on('new message', (newMessageReceived) => {
      const chat = newMessageReceived.chat

      if (!chat.users) return console.log('chat.users not defined')

      chat.users.forEach((user: { _id: string }) => {
        if (user._id === newMessageReceived.sender._id) return false

        socket.in(user._id).emit('message received', newMessageReceived)
      })
    })

    socket.off('setup', (userData) => {
      console.log('USER DISCONNECTED')
      socket.leave(userData._id)
    })
  })
}

setupServer()
