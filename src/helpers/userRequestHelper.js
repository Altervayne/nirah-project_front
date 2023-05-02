import axios from 'axios'

const apiUrl = 'http://localhost:4200/api/auth'



const getCurrentUserInfo = () => {
    return axios.get(`${apiUrl}/user`, { withCredentials: true })
                .then((response) => {
                    return response.data
                })
                .catch((error) => {
                    return false
                })
}



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



const sendFriendRequest = (id) => {
    return axios.post(`${apiUrl}/sendRequest/${id}`, { withCredentials: true })
                .then((response) => {
                    console.log(response)
                    return true
                })
                .catch((error) => {
                    console.log(error)
                    return false
                })
}



export { getCurrentUserInfo, sendFriendRequest /* getFriendsInfo */ }