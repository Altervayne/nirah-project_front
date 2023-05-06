import axios from 'axios'

const apiUrl = 'http://localhost:4200/api/friends'



const getFriendsInfo = (id) => {
    return axios.get(`${apiUrl}/${id}`, { withCredentials: true })
                .then((response) => {
                    console.log(response)
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
        const newFriend = getFriend.friendData

        console.log("newFriend object is:")
        console.log(newFriend)
        
        if(!newNewCategory.includes(newFriend)) {
            newNewCategory.push(newFriend)
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
    return axios.post(`${apiUrl}/${requestNature}/${id}`, { null: null }, { withCredentials: true })
                .then((response) => {
                    return true
                })
                .catch((error) => {
                    console.error(error)
                    return false
                })
}



export { handleFriendRequest, handleFriendsUpdate, handleFriendStatusUpdate, getFriendsInfo }