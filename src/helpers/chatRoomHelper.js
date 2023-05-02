import axios from 'axios'

const apiUrl = 'http://localhost:4200/api'



const sortChatRoomMembers = (currentUser, members) => {
    const friendMembers = members.filter(member => {
        return currentUser.friendsList.some(target => target.userID === member.userID)
    })
    
    const requestsReceivedMembers = members.filter(member => {
        return currentUser.requestsReceived.some(target => target.userID === member.userID);
    })
    
    const requestsSentMembers = members.filter(member => {
        return currentUser.requestsSent.some(target => target.userID === member.userID);
    })
    
    const normalMembers = members.filter(member => {
        return  !friendMembers.includes(member) &&
                !requestsReceivedMembers.includes(member) &&
                !requestsSentMembers.includes(member) &&
                member.username !== currentUser.username
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