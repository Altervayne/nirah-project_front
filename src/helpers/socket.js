import io from 'socket.io-client'



const SOCKET_SERVER_URL = 'http://localhost:4200'



const socket = io(SOCKET_SERVER_URL, {
    transports: ['websocket'],
    withCredentials: true
})

const socketConnectionHandler = (roomId) => {
    socket.connect()
    socket.emit('joinRoom', { roomId: roomId })
}

const socketDisconnectionHandler = (isChatRoom) => {
    socket.disconnect()
}



export { socketConnectionHandler, socketDisconnectionHandler }