import io from 'socket.io-client'



const SOCKET_SERVER_URL = 'http://localhost:4200'



const socket = io(SOCKET_SERVER_URL, {
    transports: ['websocket'],
    withCredentials: true
})

const socketJoinHandler = (roomId) => {
    socket.connect()
    socket.emit('joinRoom', { roomId: roomId })
}

const socketLeaveHandler = () => {
    socket.emit('leaveRoom')
}

const socketDisconnectHandler = () => {
    socket.disconnect()
}



export { socketJoinHandler, socketLeaveHandler, socketDisconnectHandler }