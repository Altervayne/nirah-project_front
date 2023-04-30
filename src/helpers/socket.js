import io from 'socket.io-client'



const SOCKET_SERVER_URL = 'http://localhost:4200'



const socket = io(SOCKET_SERVER_URL, {
    transports: ['websocket'],
    extraHeaders: {
        Cookie: "auth=token"
    }
})



export default socket