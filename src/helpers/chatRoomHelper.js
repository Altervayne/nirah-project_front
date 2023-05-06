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
                    return response.data
                })
                .catch((error) => {
                    return false
                })
}



const handleUserLeaveUpdate = (userId, username, currentUserInfo, usersArray, setUsersState) => {
    const friendsList = currentUserInfo.friendsList
    const requestsReceived = currentUserInfo.requestsReceived
    const requestsSent = currentUserInfo.requestsSent



    if( usersArray.friends.some((user) => user.userId === userId)
        && friendsList.some((user) => user.userId === userId)) {

                        const newRoomFriends = usersArray.friends.filter(user => user.userId !== userId)

                        setUsersState({
                            ...usersArray,
                            friends: newRoomFriends
                        })

    } else if(  usersArray.requestsReceived.some((user) => user.userId === userId)
                && requestsReceived.some((user) => user.userId === userId)) {

                        const newRoomRequestsReceived = usersArray.requestsReceived.filter(user => user.userId !== userId)

                        setUsersState({
                            ...usersArray,
                            requestsReceived: newRoomRequestsReceived
                        })

    } else if(  usersArray.requestsSent.some((user) => user.userId === userId)
                && requestsSent.some((user) => user.userId === userId)) {

                        const newRoomRequestsSent = usersArray.requestsSent.filter(user => user.userId !== userId)

                        setUsersState({
                            ...usersArray,
                            requestsSent: newRoomRequestsSent
                        })

    } else if(  usersArray.normalUsers.some((user) => user.userId === userId)) {

                        const newRoomRequestsSent = usersArray.requestsSent.filter(user => user.userId !== userId)

                        setUsersState({
                            ...usersArray,
                            requestsSent: newRoomRequestsSent
                        })
    }
}



const handleUserJoinUpdate = (userId, username, roomId, currentUserInfo, usersArray, setUsersState) => {
    const joinedUser = { userId: userId, username: username }
    const friendsList = currentUserInfo.friendsList
    const requestsReceived = currentUserInfo.requestsReceived
    const requestsSent = currentUserInfo.requestsSent



    console.log("userJoin event detected...")
    console.log("joinedUser object is:")
    console.log(joinedUser)

    

    if( !usersArray.friends.some((user) => user.userId === userId)
        && friendsList.some((user) => user.userId === userId)) {

                        const roomFriends = usersArray.friends
                        const joinedFriend = {
                            userId: userId,
                            username: username,
                            isOnline: true,
                            currentRoom: roomId
                        }

                        roomFriends.push(joinedFriend)

                        setUsersState({
                            ...usersArray,
                            friends: roomFriends
                        })

    } else if(  !usersArray.requestsReceived.some((user) => user.userId === userId)
                && requestsReceived.some((user) => user.userId === userId)) {

                        const roomRequestsReceived = usersArray.requestsReceived
                        roomRequestsReceived.push(joinedUser)

                        setUsersState({
                            ...usersArray,
                            requestsReceived: roomRequestsReceived
                        })

    } else if(  !usersArray.requestsSent.some((user) => user.userId === userId)
                && requestsSent.some((user) => user.userId === userId)) {

                        const roomRequestsSent = usersArray.requestsSent
                        roomRequestsSent.push(joinedUser)

                        setUsersState({
                            ...usersArray,
                            requestsSent: roomRequestsSent
                        })

    } else if(  !usersArray.normalUsers.some((user) => user.userId === userId)) {

                        const roomNormalUsers = usersArray.normalUsers
                        roomNormalUsers.push(joinedUser)

                        setUsersState({
                            ...usersArray,
                            normalUsers: roomNormalUsers
                        })
    }
}



export { sortChatRoomMembers, getCurrentChatRoomInfo, handleUserLeaveUpdate, handleUserJoinUpdate }