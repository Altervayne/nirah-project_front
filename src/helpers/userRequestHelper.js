import axios from 'axios'

const apiUrl = 'http://localhost:4200/api'
const token = localStorage.getItem('token')
const requestConfig = {
    headers: { Authorization: `Bearer ${token}` }
}

const isLoggedIn = () => {
    return !!token
}



const getCurrentUserInfo = () => {
    return axios.get(`${apiUrl}/auth/user`, null, requestConfig)
                .then((response) => {
                    console.log(response)
                })
}



export { getCurrentUserInfo }