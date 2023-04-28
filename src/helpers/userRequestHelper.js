import axios from 'axios'

const apiUrl = 'http://localhost:4200/api'
const token = localStorage.getItem('token').replace(/"/g, '')
const requestConfig = {
    headers: { 'Authorization': `Bearer ${token}` }
}

const isLoggedIn = () => {
    return !!token
}



const getCurrentUserInfo = () => {
    return isLoggedIn() ?   axios.get(`${apiUrl}/auth/user`, requestConfig)
                                .then((response) => {
                                    console.log(response)
                                })
                                .catch((error) => { console.log(error) })
                        :   false
}



export { getCurrentUserInfo }