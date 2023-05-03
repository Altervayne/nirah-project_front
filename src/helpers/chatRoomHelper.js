import axios from 'axios'

const apiUrl = 'http://localhost:4200/api'



const sortChatRoomMembers = (currentUser, members) => {
    const otherMembers = members.filter(user => user.username !== currentUser.username)

    const friendMembers = otherMembers.filter(member => {
        return currentUser.friendsList.some(target => target.userID === member.userID)
    })
    
    const requestsReceivedMembers = otherMembers.filter(member => {
        return currentUser.requestsReceived.some(target => target.userID === member.userID);
    })
    
    const requestsSentMembers = otherMembers.filter(member => {
        return currentUser.requestsSent.some(target => target.userID === member.userID);
    })
    
    const normalMembers = otherMembers.filter(member => {
        return  !friendMembers.includes(member) &&
                !requestsReceivedMembers.includes(member) &&
                !requestsSentMembers.includes(member)
    })

    const sortedMembers = {
        friends: friendMembers,
        requestsReceived: requestsReceivedMembers,
        requestsSent: requestsSentMembers,
        normalUsers: normalMembers,
    }

    return sortedMembers
}



const getCurrentChatRoomInfo = (name) => {
    return axios.get(`${apiUrl}/chatroom/${name}`, { withCredentials: true })
                .then((response) => {
                    console.log(response)
                    return response.data
                })
                .catch((error) => {
                    return false
                })
}



export { sortChatRoomMembers, getCurrentChatRoomInfo }