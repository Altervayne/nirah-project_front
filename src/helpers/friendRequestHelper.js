import axios from 'axios'
import { apiUrl } from '../data/variables'

const url = `${apiUrl}/api/friends`



const getFriendsInfo = (id) => {
    return axios.get(`${url}/${id}`, { withCredentials: true })
                .then((response) => {
                    return response.data
                })
                .catch((error) => {
                    return false
                })
}



const handleFriendsUpdate = async (userId, username, previousCategory, newCategory, usersArray, setUsersState) => {
    const newPreviousCategory = usersArray[previousCategory].filter(user => user.userId !== userId)    
    const newNewCategory = usersArray[newCategory]
    const swappedUser = { userId: userId, username: username }

    if(newCategory === 'friends') {
        const getFriend = await getFriendsInfo(userId)
        
        if(!newNewCategory.includes(getFriend)) {
            newNewCategory.push(getFriend)
        }

        setUsersState({
            ...usersArray,
            [newCategory]: newNewCategory,
            [previousCategory]: newPreviousCategory
        })

        return
    }

    if(!newNewCategory.includes(swappedUser)) {
        newNewCategory.push(swappedUser)
    }

    setUsersState({
        ...usersArray,
        [newCategory]: newNewCategory,
        [previousCategory]: newPreviousCategory
    })
}



const handleFriendStatusUpdate = async (userId, usersArray, setUsersState) => {
    const newFriends = usersArray.friends.filter(user => user.userId !== userId)
    const updatedFriend = await getFriendsInfo(userId)
    
    newFriends.push(updatedFriend)

    setUsersState({
        ...usersArray,
        friends: newFriends
    })
}



const handleFriendRequest = (id, requestNature) => {
    return axios.post(`${url}/${requestNature}/${id}`, { null: null }, { withCredentials: true })
                .then((response) => {
                    return true
                })
                .catch((error) => {
                    console.error(error)
                    return false
                })
}



const handleFriendAccountDeleted = (userId, usersArray, setUsersState) => {
    const newFriendsList = usersArray.friends.filter(user => user.userId !== userId)
    const newRequestsSent = usersArray.requestsSent.filter(user => user.userId !== userId)
    const newRequestsReceived = usersArray.requestsReceived.filter(user => user.userId !== userId)

    setUsersState({
        ...usersArray,
        friends: newFriendsList,
        requestsSent: newRequestsSent,
        requestsReceived: newRequestsReceived
    })
}




export { handleFriendRequest, handleFriendsUpdate, handleFriendStatusUpdate, getFriendsInfo, handleFriendAccountDeleted }