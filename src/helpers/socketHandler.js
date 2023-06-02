import io from 'socket.io-client'
import { apiUrl } from '../data/variables'



const socket = io(apiUrl, {
    transports: ['websocket'],
    withCredentials: true
})



const socketJoinHandler = async (roomId) => {
    const userJoined = await new Promise((resolve) => {
        socket.emit('joinRoom', { roomId: roomId }, (response) => {
            resolve(response)   
        })
    })

    return userJoined
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



const socketAccountDeleteHandler = () => {
    socket.emit('deleteAccount', {})
}



export { socket, socketJoinHandler, socketLeaveHandler, socketDisconnectHandler, socketFriendRequestHandler, socketAccountDeleteHandler }