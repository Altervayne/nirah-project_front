import axios from 'axios'

const apiUrl = 'http://localhost:4200/api'



const getCurrentUserInfo = () => {
    return axios.get(`${apiUrl}/auth/user`, { withCredentials: true })
                .then((response) => {
                    console.log(response)
                    return response.data
                })
                .catch((error) => {
                    return false
                })
}



const getFriendsInfo = (friendsList) => {
    return axios.get(`${apiUrl}/friends`, { withCredentials: true })
                .then((response) => {
                    console.log(response)
                    return response.data
                })
                .catch((error) => {
                    return false
                })
}



export { getCurrentUserInfo, getFriendsInfo }