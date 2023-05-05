import axios from 'axios'

const apiUrl = 'http://localhost:4200/api/friends'



/* const getFriendsInfo = (friendsList) => {
    return axios.get(`${apiUrl}/`, { withCredentials: true })
                .then((response) => {
                    console.log(response)
                    return response.data
                })
                .catch((error) => {
                    return false
                })
} */



const handleUsersUpdate = (userId, username, previousCategory, newCategory, usersArray, setUsersState) => {
    const newPreviousCategory = usersArray[previousCategory].filter(user => user.userId !== userId)
    const newNewCategory = usersArray[newCategory]
    const swappedUser = { userId: userId, username: username }

    if(newNewCategory.includes(swappedUser)) {
        setUsersState({
            ...usersArray,
            [newCategory]: newNewCategory,
            [previousCategory]: newPreviousCategory
        })
    } else {
        newNewCategory.push(swappedUser)

        setUsersState({
            ...usersArray,
            [newCategory]: newNewCategory,
            [previousCategory]: newPreviousCategory
        })
    }
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



export { handleFriendRequest, handleUsersUpdate /* getFriendsInfo */ }