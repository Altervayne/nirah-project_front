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



export { getCurrentUserInfo }