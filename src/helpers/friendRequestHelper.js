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



const handleFriendRequest = (id, requestNature) => {
    return axios.post(`${apiUrl}/${requestNature}/${id}`, { null: null }, { withCredentials: true })
                .then((response) => {
                    console.log(response)
                    return true
                })
                .catch((error) => {
                    console.log(error)
                    return false
                })
}



export { handleFriendRequest /* getFriendsInfo */ }