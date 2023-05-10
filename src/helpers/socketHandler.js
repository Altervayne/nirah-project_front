import io from 'socket.io-client'



const SOCKET_SERVER_URL = 'http://localhost:4200'



const socket = io(SOCKET_SERVER_URL, {
    transports: ['websocket'],
    withCredentials: true
})



const socketJoinHandler = (roomId) => {
    socket.emit('joinRoom', { roomId: roomId })
}



const socketLeaveHandler = async () => {
    const userLeft = await new Promise((resolve) => {
        socket.emit('leaveRoom', {}, (response) => {
            resolve(response)   
        })
    })

    return userLeft
}



const socketDisconnectHandler = () => {
    socket.disconnect()
}



const socketFriendRequestHandler = (userId, requestType) => {
    socket.emit('friendRequest', { userId: userId, requestType: requestType })
}



export { socket, socketJoinHandler, socketLeaveHandler, socketDisconnectHandler, socketFriendRequestHandler }